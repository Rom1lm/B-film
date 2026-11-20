import { create } from "zustand";

export const useStore = create((set, get) => ({
  films: [],
  setFilms: (films) => set({ films }),

  isFavorite: (id) => {
    return useFavorisStore.getState().films.includes(id);
  },
  basculerfavs: (id) => {
    const isFavorite = get().isFavorite;
    if (isFavorite.includes(id)) {
      set({ isFavorite: isFavorite.filter((fav) => fav !== id) });
    } else {
      set({ isFavorite: [...isFavorite, id] });
    }
  },
}));