import { create } from "zustand";

const useNaiseiFrontEnd = create((set) => ({
  allData: [],
  setAllData: (newData: any) => set({ allData: newData }),
}));

export default useNaiseiFrontEnd;