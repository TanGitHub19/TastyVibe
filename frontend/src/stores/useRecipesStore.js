import { create } from "zustand";
import axios from "axios";

const API_URL = "https://tasty-vibe.onrender.com/api";

const useRecipesStore = create((set) => ({
  recipes: [],
  isRecipesLoading: false,
  error: null,
  selectedCategory: "",
  recipeDetails: null,
  isRecipeDetailsLoading: false,

  fetchRecipes: async (category = "", searchQuery = "") => {
    set({ isRecipesLoading: true, error: null, recipes: [] });

    try {
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (category) params.category = category;

      const response = await axios.get(`${API_URL}/recipes`, { params });

      set({
        recipes: response.data.meals || [],
        isRecipesLoading: false,
        selectedCategory: category || "All",
      });
    } catch (error) {
      console.error(
        "Error fetching recipes:",
        error.response?.data || error.message
      );
      set({
        error: error.response?.data || error.message,
        isRecipesLoading: false,
      });
    }
  },

  fetchRecipeDetails: async (id) => {
    set({ isRecipeDetailsLoading: true, recipeDetails: null, error: null });

    try {
      const response = await axios.get(`${API_URL}/recipes/${id}`);

      set({
        recipeDetails: response.data.meals?.[0] || null,
        isRecipeDetailsLoading: false,
      });
    } catch (error) {
      console.error(
        "Error fetching recipe details:",
        error.response?.data || error.message
      );
      set({
        error: error.response?.data || error.message,
        isRecipeDetailsLoading: false,
      });
    }
  },
}));

export default useRecipesStore;
