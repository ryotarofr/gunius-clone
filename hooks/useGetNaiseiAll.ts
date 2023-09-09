import { create } from "zustand";
import axios from "axios";

const useGetAllNaisei = create((set) => ({
  data: [],
  loading: false,
  hasErrors: false,
  fetch: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        "/api/naisei"
      );
      set((state: any) => ({
        data: (state.data = response.data.allNaisei),
        loading: false
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}));

export default useGetAllNaisei;