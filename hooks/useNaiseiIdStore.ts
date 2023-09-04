// /libs/store.ts

import { create } from "zustand";

interface NaiseiStore {
  naiseiId: any[];
  selectedId: any;
  setNaiseiId: (naiseiId: any[]) => void;
  setSelectedId: (naiseiId: any) => void;
};

export const useNaiseiIdStore = create<NaiseiStore>((set) => ({
  naiseiId: [""],
  selectedId: null,
  setNaiseiId: (naiseiId) => set({ naiseiId }),
  setSelectedId: (naiseiId) => set({ selectedId: naiseiId }),
}));
