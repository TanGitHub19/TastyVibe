import { create } from "zustand";
import axios from "axios";

const API_URL = "https://tasty-vibe.onrender.com/api";

const useCocktailsStore = create((set) => ({
  cocktails: [],
  selectedCocktail: null,
  isCocktailsLoading: false,
  isCocktailDetailsLoading: false,
  error: null,
  selectedCategory: "",

  fetchCocktails: async (category = "", searchQuery = "") => {
    set({ isCocktailsLoading: true, error: null, cocktails: [] });

    try {
      let params = {};
      if (searchQuery) params.query = searchQuery;
      if (category) params.category = category;

      const response = await axios.get(`${API_URL}/cocktail`, { params });

      set({
        cocktails: response.data.drinks || [],
        isCocktailsLoading: false,
        selectedCategory: category,
      });
    } catch (error) {
      console.error("Error fetching cocktails:", error.message);
      set({ error: error.message, isCocktailsLoading: false });
    }
  },

  fetchCocktailDetails: async (id) => {
    set({
      isCocktailDetailsLoading: true,
      selectedCocktail: null,
      error: null,
    });

    try {
      const response = await axios.get(
        `${API_URL}/cocktail/${id}`
      );

      set({
        selectedCocktail: response.data.drinks?.[0] || null,
        isCocktailDetailsLoading: false,
      });
    } catch (error) {
      console.error("Error fetching cocktail details:", error.message);
      set({ error: error.message, isCocktailDetailsLoading: false });
    }
  },
}));

export default useCocktailsStore;
