import axios from "axios";

//This will get all the images, name of the cocktails to be deplayed in the drinks page
export const getCocktails = async (req, res) => {
  const query = req.query.query || "";
  const category = req.query.category || "";

  try {
    let url;
    let params = {};

    if (query) {
      url = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
      params.s = query;
    } else if (category) {
      url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
      params.c = category;
    } else {
      url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    }

    const response = await axios.get(url, { params });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching cocktails:", error.message);
    res.status(500).json({ message: "Error fetching cocktails" });
  }
};

//This will get all the images, name, details, and the other information of the cocktails in the see complete details 
export const getCocktailDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php",
      {
        params: { i: id },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching cocktail details:", error.message);
    res.status(500).json({ message: "Error fetching cocktail details" });
  }
};

//This will randomly get cocktails along with their details of image and name to be displayed in the drinks page
export const getRandomCocktails = async (req, res) => {
  const count = req.query.count || 5;
  let drinks = [];

  try {
    for (let i = 0; i < count; i++) {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );

      if (response.data.drinks) {
        drinks.push(response.data.drinks[0]);
      }
    }

    res.json({ drinks });
  } catch (error) {
    console.error("Error fetching random cocktails:", error.message);
    res.status(500).json({ message: "Error fetching random cocktails" });
  }
};
