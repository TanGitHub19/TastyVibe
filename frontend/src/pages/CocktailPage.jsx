import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import useCocktailsStore from "../stores/useCocktailStore.js";
import { ArrowRight, Search } from "lucide-react";
import SkeletonLoading from "../components/SkeletonLoading.jsx";

const CocktailsPage = () => {
  const {
    cocktails,
    isCocktailsLoading,
    error,
    fetchCocktails,
    selectedCategory,
  } = useCocktailsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCocktails("Ordinary Drink", "");
  }, [fetchCocktails]);

  const handleCategoryClick = (category) => {
    fetchCocktails(category, searchQuery);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchCocktails(selectedCategory, query);
  };

  const handleCocktailClick = (idDrink) => {
    navigate(`/cocktail/${idDrink}`);
  };

  return (
    <div className="bg-gray-900 text-white font-poppins min-h-screen">
      <Navbar />
      <div className="max-w-screen-3xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="relative mx-auto my-8 bg-bg-5 bg-cover bg-top bg-no-repeat w-full text-center py-12 md:py-16 px-4 md:px-6 rounded-md shadow-lg">
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Explore & Sip: Your Perfect Cocktail Awaits! 🍹
            </h1>
            <p className="text-gray-200 mt-2 max-w-2xl mx-auto text-sm md:text-lg">
              Discover a world of handcrafted cocktails! Search, browse, and
              find the perfect drink to match your mood and occasion.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-6 px-4 md:px-12">
        <div className="relative w-full max-w-7xl">
          <input
            type="text"
            placeholder="Search for a cocktail..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 pl-10 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-center gap-4 px-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { name: "Ordinary Drink", icon: "🥂" },
            { name: "Cocktail", icon: "🍹" },
            { name: "Homemade Liqueur", icon: "🏠🍶" },

            { name: "Beer", icon: "🍺" },
          ].map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className={`px-3 py-2 rounded-full cursor-pointer transition flex items-center gap-2 text-sm md:text-base ${
                selectedCategory === name
                  ? "bg-blue-700 text-white"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { name: "Coffee / Tea", icon: "☕" },
            { name: "Shot", icon: "🥃" },

            { name: "Soft Drink", icon: "🥤" },
          ].map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className={`px-3 py-2 rounded-full cursor-pointer transition flex items-center gap-2 text-sm md:text-base ${
                selectedCategory === name
                  ? "bg-blue-700 text-white"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-4 md:px-12 lg:px-20">
        {isCocktailsLoading ? (
          <SkeletonLoading />
        ) : error ? (
          <p className="text-red-500 text-center font-poppins">
            Error: {error}
          </p>
        ) : cocktails.length > 0 ? (
          [...cocktails].reverse().map((cocktail) => (
            <div key={cocktail.idDrink} className="relative overflow-hidden">
              <div className="relative h-56 sm:h-64">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  onClick={() => handleCocktailClick(cocktail.idDrink)}
                  className="absolute bottom-1 left-4 right-4 bg-amber-500 text-gray-900 py-1 rounded-full shadow-lg flex items-center justify-between px-4 text-sm md:text-base transition duration-300 ease-in-out hover:bg-amber-600 hover:translate-y-[-2px] hover:shadow-2xl"
                >
                  <span>See Complete Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-lg md:text-xl font-semibold mt-2 text-center">
                {cocktail.strDrink}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No cocktails found.</p>
        )}
      </div>
    </div>
  );
};

export default CocktailsPage;
