import { useCallback, useSyncExternalStore } from "react";

const API_URL = "http://localhost:5000/api";
const BACKEND_URL = "http://localhost:5000";

function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.includes("/uploads/")) {
    return url.replace(/https?:\/\/[^/]+\/uploads/, `${BACKEND_URL}/uploads`);
  }
  return url;
}

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: "faculty" | "team";
  image: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type StoreState = {
  members: TeamMember[];
  isLoading: boolean;
};

class TeamStore {
  private state: StoreState;
  private listeners: Set<() => void>;

  constructor() {
    this.listeners = new Set();
    this.state = { members: [], isLoading: true };
    if (typeof window !== "undefined") {
      this.fetchMembers();
    }
  }

  async fetchMembers() {
    try {
      const response = await fetch(`${API_URL}/team`);
      if (response.ok) {
        const members = await response.json();
        // Normalize image URLs
        const normalizedMembers = members.map((m: TeamMember) => ({
          ...m,
          image: normalizeUrl(m.image),
        }));
        this.state = { members: normalizedMembers, isLoading: false };
      } else {
        this.state = { ...this.state, isLoading: false };
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
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
  async addMember(member: Partial<TeamMember>) {
    try {
      const response = await fetch(`${API_URL}/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });
      if (response.ok) {
        const saved = await response.json();
        saved.image = normalizeUrl(saved.image);
        this.state = { ...this.state, members: [...this.state.members, saved] };
        this.emitChange();
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async updateMember(id: string, updates: Partial<TeamMember>) {
    try {
      const response = await fetch(`${API_URL}/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        const updated = await response.json();
        updated.image = normalizeUrl(updated.image);
        this.state = {
          ...this.state,
          members: this.state.members.map((m) => (m.id === id ? updated : m)),
        };
        this.emitChange();
        return updated;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async deleteMember(id: string) {
    try {
      await fetch(`${API_URL}/team/${id}`, { method: "DELETE" });
      this.state = {
        ...this.state,
        members: this.state.members.filter((m) => m.id !== id),
      };
      this.emitChange();
    } catch (e) {
      console.error(e);
    }
  }

  async uploadImage(id: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/team/${id}/image`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updated = await response.json();
        const url = normalizeUrl(updated.image);
        this.state = {
          ...this.state,
          members: this.state.members.map((m) =>
            m.id === id ? { ...m, image: url } : m
          ),
        };
        this.emitChange();
        return url;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}

export const teamStore = new TeamStore();

export function useTeamStore() {
  const state = useSyncExternalStore(
    useCallback((onStoreChange) => teamStore.subscribe(onStoreChange), []),
    () => teamStore.getSnapshot(),
    () => teamStore.getSnapshot()
  );

  return {
    members: state.members,
    isLoading: state.isLoading,
    addMember: (m: Partial<TeamMember>) => teamStore.addMember(m),
    updateMember: (id: string, updates: Partial<TeamMember>) => teamStore.updateMember(id, updates),
    deleteMember: (id: string) => teamStore.deleteMember(id),
    uploadImage: (id: string, file: File) => teamStore.uploadImage(id, file),
  };
}
