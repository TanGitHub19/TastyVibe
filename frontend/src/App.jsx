import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import CocktailsPage from "./pages/CocktailPage";
import CocktailDetailsPage from "./pages/CocktailDetailsPage";
import SpotifyGlobal from "./components/SpotifyGlobal";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SpotifyGlobal />}>
        <Route index element={<Homepage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="cocktails" element={<CocktailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="spotify-data" element={<div></div>} />
        <Route path="recipe/:idMeal" element={<RecipeDetailsPage />} />
        <Route path="cocktail/:idDrink" element={<CocktailDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
