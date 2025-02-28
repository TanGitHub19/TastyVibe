import express from "express";
import { getRecipes, getRecipeDetails, getRandomRecipes } from "../controller/recipesController.js";

const router = express.Router();

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeDetails);
router.get("/meal/random-recipe", getRandomRecipes);


export default router;
