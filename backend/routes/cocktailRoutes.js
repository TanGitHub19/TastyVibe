import express from "express";
import {
  getCocktails,
  getCocktailDetails,
  getRandomCocktails,
} from "../controller/cocktailController.js";

const router = express.Router();

router.get("/cocktail", getCocktails);
router.get("/cocktail/:id", getCocktailDetails);
router.get("/drinks/random-cocktail", getRandomCocktails);

export default router;
