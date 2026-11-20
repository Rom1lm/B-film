import { create } from "zustand";

export const useStore = create((set, get) => ({
  isFavorite: [],
  basculerfavs: (film) => {
    const isFavorite = get().isFavorite;
    if (isFavorite.some((fav) => fav.id === film.id)) {
      set({ isFavorite: isFavorite.filter((fav) => fav.id !== film.id) });
    } else {
      set({ isFavorite: [...isFavorite, film] });
    }
  },
}));