import { create } from "zustand";

export const useStore = create((set, get) => ({
  logements: [],
  setLogements: (logements) => set({ logements }),

  isFavorite: [],
  basculerfavs: (id) => {
    const isFavorite = get().isFavorite;
    if (isFavorite.includes(id)) {
      set({ isFavorite: isFavorite.filter((fav) => fav !== id) });
    } else {
      set({ isFavorite: [...isFavorite, id] });
    }
  },
}));