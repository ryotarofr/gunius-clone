import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        "/api/assessment"
      );
      set((state: any) => ({
        data: (state.data = response.data.getAllAssesmentByUser.map(({ createdAt, achievement }: any) => ({ createdAt, achievement }))),
        loading: false
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));

export default useStore;