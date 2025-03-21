import axios from "axios";

//This will  all the images, name of the meals to be deplayed in the recipe page
export const getRecipes = async (req, res) => {
  const query = req.query.query || "";
  const category = req.query.category || "";

  try {
    let url;
    let params = {};

    if (query) {
      url = "https://www.themealdb.com/api/json/v1/1/search.php";
      params.s = query;
    } else if (category) {
      url = "https://www.themealdb.com/api/json/v1/1/filter.php";
      params.c = category;
    } else {
      url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    }

    const response = await axios.get(url, { params });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

//This will get all the images, name, details, and other informations of the meals in the see complete recipe page
export const getRecipeDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/lookup.php",
      { params: { i: id } }
    );


    if (!response.data.meals || response.data.meals.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    res.status(500).json({ message: "Error fetching recipe details" });
  }
};

//This will randomly get meals along with their details of image and name to be displayed in the recipe page
export const getRandomRecipes = async (req, res) => {
  const count = req.query.count || 5;
  let meals = [];

  try {
    for (let i = 0; i < count; i++) {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      if (response.data.meals) {
        meals.push(response.data.meals[0]);
      }
    }

    res.json({ meals });
  } catch (error) {
    console.error("Error fetching random recipes:", error.message);
    res.status(500).json({ message: "Error fetching random recipes" });
  }
};
