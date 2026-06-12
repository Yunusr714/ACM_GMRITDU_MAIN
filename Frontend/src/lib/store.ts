import { Event, EventDetail } from "./events-data";
import { useCallback, useSyncExternalStore } from "react";

const API_URL = "http://localhost:5000/api";
const BACKEND_URL = "http://localhost:5000";

// Ensure upload URLs always point to the backend, not the frontend
function normalizeUrl(url: string): string {
  if (url.includes("/uploads/")) {
    // Replace any host:port with the backend URL
    return url.replace(/https?:\/\/[^/]+\/uploads/, `${BACKEND_URL}/uploads`);
  }
  return url;
}

export type StoredEvent = Event & {
  details: EventDetail;
  files: { id: string; name: string; url: string; size: string }[];
};

type StoreState = {
  events: StoredEvent[];
  isLoading: boolean;
};

class EventStore {
  private state: StoreState;
  private listeners: Set<() => void>;

  constructor() {
    this.listeners = new Set();
    this.state = { events: [], isLoading: true };
    if (typeof window !== "undefined") {
      this.fetchEvents();
    }
  }

  async fetchEvents() {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        const events = await response.json();
        this.state = { events, isLoading: false };
      } else {
        this.state = { ...this.state, isLoading: false };
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      this.state = { ...this.state, isLoading: false };
    }
    this.emitChange();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot() {
    return this.state;
  }

  private emitChange() {
    for (let listener of this.listeners) {
      listener();
    }
  }

  // Actions
  async addEvent(event: Partial<StoredEvent>) {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        const saved = await response.json();
        this.state = { ...this.state, events: [saved, ...this.state.events] };
        this.emitChange();
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async updateEvent(id: string, updates: Partial<StoredEvent>) {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        const updated = await response.json();
        this.state = {
          ...this.state,
          events: this.state.events.map((e) => (e.id === id ? updated : e)),
        };
        this.emitChange();
        return updated;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async deleteEvent(id: string) {
    try {
      await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });
      this.state = {
        ...this.state,
        events: this.state.events.filter((e) => e.id !== id),
      };
      this.emitChange();
    } catch (e) {
      console.error(e);
    }
  }

  async addFile(eventId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch(`${API_URL}/events/${eventId}/files`, {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const savedFile = await response.json();
        if (savedFile.url) savedFile.url = normalizeUrl(savedFile.url);
        this.state = {
          ...this.state,
          events: this.state.events.map((e) => {
            if (e.id === eventId) {
              return { ...e, files: [...e.files, savedFile] };
            }
            return e;
          }),
        };
        this.emitChange();
        return savedFile;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async deleteFile(eventId: string, fileId: string) {
    try {
      await fetch(`${API_URL}/events/${eventId}/files/${fileId}`, { method: "DELETE" });
      this.state = {
        ...this.state,
        events: this.state.events.map((e) => {
          if (e.id === eventId) {
            return { ...e, files: e.files.filter((f) => f.id !== fileId) };
          }
          return e;
        }),
      };
      this.emitChange();
    } catch (e) {
      console.error(e);
    }
  }

  async addImage(eventId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/events/${eventId}/images`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const url = normalizeUrl(data.url);
        this.state = {
          ...this.state,
          events: this.state.events.map((e) => {
            if (e.id === eventId) {
              return {
                ...e,
                details: { ...e.details, gallery: [url, ...(e.details?.gallery || [])] },
              };
            }
            return e;
          }),
        };
        
        // Also update the event itself in the backend with the new gallery
        const event = this.state.events.find(e => e.id === eventId);
        if (event) {
          await fetch(`${API_URL}/events/${eventId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ details: event.details }),
          });
        }
        
        this.emitChange();
        return url;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async deleteImage(eventId: string, imageUrl: string) {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        this.state = {
          ...this.state,
          events: this.state.events.map((e) =>
            e.id === eventId ? { ...e, details: updatedEvent.details } : e
          ),
        };
        this.emitChange();
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const eventStore = new EventStore();

export function useEventStore() {
  const state = useSyncExternalStore(
    useCallback((onStoreChange) => eventStore.subscribe(onStoreChange), []),
    () => eventStore.getSnapshot(),
    () => eventStore.getSnapshot()
  );

  return {
    events: state.events,
    isLoading: state.isLoading,
    addEvent: (e: Partial<StoredEvent>) => eventStore.addEvent(e),
    updateEvent: (id: string, updates: Partial<StoredEvent>) => eventStore.updateEvent(id, updates),
    deleteEvent: (id: string) => eventStore.deleteEvent(id),
    addFile: (eventId: string, file: File) => eventStore.addFile(eventId, file),
    deleteFile: (eventId: string, fileId: string) => eventStore.deleteFile(eventId, fileId),
    addImage: (eventId: string, file: File) => eventStore.addImage(eventId, file),
    deleteImage: (eventId: string, imageUrl: string) => eventStore.deleteImage(eventId, imageUrl),
  };
}
