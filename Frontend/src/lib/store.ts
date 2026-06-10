import { events as defaultEvents, eventDetails as defaultEventDetails, Event, EventDetail } from "./events-data";
import { useCallback, useSyncExternalStore } from "react";

// The full event type combining summary and details for storage
export type StoredEvent = Event & {
  details: EventDetail;
  files: { id: string; name: string; url: string; size: string }[];
};

type StoreState = {
  events: StoredEvent[];
};

// Initialize from existing data if local storage is empty
const initializeStore = (): StoreState => {
  const defaultStored: StoredEvent[] = defaultEvents.map((e) => ({
    ...e,
    details: defaultEventDetails[e.id] ?? {
      participants: "0",
      teams: "0",
      mentors: "0",
      speakers: [],
      organizers: [],
      venue: "TBD",
      overview: "",
      objectives: [],
      impact: [],
      gallery: [],
      duration: "1 Day",
    },
    files: [],
  }));
  return { events: defaultStored };
};

class EventStore {
  private state: StoreState;
  private listeners: Set<() => void>;

  constructor() {
    this.listeners = new Set();
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("acm_event_store");
      if (stored) {
        try {
          this.state = JSON.parse(stored);
        } catch (e) {
          this.state = initializeStore();
        }
      } else {
        this.state = initializeStore();
        this.persist();
      }
    } else {
      this.state = initializeStore();
    }
  }

  private persist() {
    if (typeof window !== "undefined") {
      localStorage.setItem("acm_event_store", JSON.stringify(this.state));
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
  addEvent(event: StoredEvent) {
    this.state = { ...this.state, events: [event, ...this.state.events] };
    this.persist();
  }

  updateEvent(id: string, updates: Partial<StoredEvent>) {
    this.state = {
      ...this.state,
      events: this.state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    };
    this.persist();
  }

  deleteEvent(id: string) {
    this.state = {
      ...this.state,
      events: this.state.events.filter((e) => e.id !== id),
    };
    this.persist();
  }

  addFile(eventId: string, file: { id: string; name: string; url: string; size: string }) {
    this.state = {
      ...this.state,
      events: this.state.events.map((e) => {
        if (e.id === eventId) {
          return { ...e, files: [...e.files, file] };
        }
        return e;
      }),
    };
    this.persist();
  }

  deleteFile(eventId: string, fileId: string) {
    this.state = {
      ...this.state,
      events: this.state.events.map((e) => {
        if (e.id === eventId) {
          return { ...e, files: e.files.filter((f) => f.id !== fileId) };
        }
        return e;
      }),
    };
    this.persist();
  }

  addImage(eventId: string, imageUrl: string) {
    this.state = {
      ...this.state,
      events: this.state.events.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            details: { ...e.details, gallery: [imageUrl, ...e.details.gallery] },
          };
        }
        return e;
      }),
    };
    this.persist();
  }

  deleteImage(eventId: string, imageUrl: string) {
    this.state = {
      ...this.state,
      events: this.state.events.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            details: { ...e.details, gallery: e.details.gallery.filter((img) => img !== imageUrl) },
          };
        }
        return e;
      }),
    };
    this.persist();
  }
}

export const eventStore = new EventStore();

export function useEventStore() {
  const state = useSyncExternalStore(
    useCallback((onStoreChange) => eventStore.subscribe(onStoreChange), []),
    () => eventStore.getSnapshot(),
    () => eventStore.getSnapshot() // For SSR, just return snapshot since no localstorage
  );

  return {
    events: state.events,
    addEvent: (e: StoredEvent) => eventStore.addEvent(e),
    updateEvent: (id: string, updates: Partial<StoredEvent>) => eventStore.updateEvent(id, updates),
    deleteEvent: (id: string) => eventStore.deleteEvent(id),
    addFile: (eventId: string, file: { id: string; name: string; url: string; size: string }) => eventStore.addFile(eventId, file),
    deleteFile: (eventId: string, fileId: string) => eventStore.deleteFile(eventId, fileId),
    addImage: (eventId: string, imageUrl: string) => eventStore.addImage(eventId, imageUrl),
    deleteImage: (eventId: string, imageUrl: string) => eventStore.deleteImage(eventId, imageUrl),
  };
}
