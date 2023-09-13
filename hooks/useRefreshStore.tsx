import { create } from 'zustand';

type RefreshStore = {
  refresh: boolean;
  toggleRefresh: () => void;
};

const useRefreshStore = create<RefreshStore>((set) => ({
  refresh: false,
  toggleRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));

export default useRefreshStore;
