import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import useCocktailsStore from "../stores/useCocktailStore.js";
import { ChevronLeft } from "lucide-react";
import DetailsSkeleton from "../components/DetailsSkeleton.jsx";

const CocktailDetailsPage = () => {
  const { idDrink } = useParams();
  const navigate = useNavigate();
  const { selectedCocktail, fetchCocktailDetails, isCocktailDetailsLoading } =
    useCocktailsStore();
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    fetchCocktailDetails(idDrink);
  }, [idDrink, fetchCocktailDetails]);

  if (isCocktailDetailsLoading) return <DetailsSkeleton />;
  if (!selectedCocktail) return <p>No details found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = selectedCocktail[`strIngredient${i}`];
    const measure = selectedCocktail[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  
  const instructions = selectedCocktail.strInstructions
    ?.split(/\r?\n/)
    .filter((line) => line.trim() !== "");

  return (
    <div className="bg-gray-900 text-white font-poppins min-h-screen">
      <Navbar />

      <div className="px-4 md:px-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-2 px-6 bg-amber-500 text-gray-900 rounded-full hover:bg-amber-600 transition md:w-36"
        >
          <ChevronLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>

      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <img
            src={selectedCocktail.strDrinkThumb}
            alt={selectedCocktail.strDrink}
            className="w-full h-auto rounded-lg mb-4"
          />

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between">
            {selectedCocktail.strYoutube && (
              <a
                href={selectedCocktail.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                  alt="YouTube"
                  className="w-8 h-8"
                />
                Watch on YouTube
              </a>
            )}

            {selectedCocktail.strSource && (
              <a
                href={selectedCocktail.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/internet.png"
                  alt="Source"
                  className="w-8 h-8"
                />
                Original Recipe Source
              </a>
            )}
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {selectedCocktail.strDrink}
          </h1>
          <p className="text-lg mb-2">
            <strong>Category:</strong> {selectedCocktail.strCategory}
          </p>
          <p className="text-lg mb-2">
            <strong>Glass:</strong> {selectedCocktail.strGlass}
          </p>

          <div className="flex gap-4 mb-4 bg-gray-800 p-3 rounded-md w-full md:max-w-72">
            <button
              onClick={() => setActiveTab("instructions")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "instructions"
                  ? "bg-amber-500 text-gray-900"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "ingredients"
                  ? "bg-amber-500 text-gray-900"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              Ingredients
            </button>
          </div>

          {activeTab === "instructions" && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
              <ol className="space-y-4 text-base text-justify">
                {instructions?.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-sm flex items-center justify-center w-8 h-8 p-4 rounded-full bg-white text-black font-semibold">
                      {index + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-none">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.ingredient}</span>
                    <span className="font-semibold">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CocktailDetailsPage;
