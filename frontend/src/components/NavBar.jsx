import { HomeIcon, Menu, Music, User, Utensils, Wine, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md font-poppins">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center ml-5">
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-full h-full object-cover filter invert "
                />
              </div>
              <h1 className="text-3xl font-medium font-pacifico text-white">
                Tasty<span className="text-yellow-400">Vibe</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-browny"
          >
            <HomeIcon className="w-5 h-5 text-white" />
            <span>Home</span>
          </Link>
          <Link
            to="/recipes"
            className="flex items-center space-x-2 hover:text-browny"
          >
            <Utensils className="w-5 h-5 text-white" />
            <span>Recipes</span>
          </Link>
          <Link
            to="/cocktails"
            className="flex items-center space-x-2 hover:text-browny"
          >
            <Wine className="w-5 h-5 text-white" />
            <span>Drinks</span>
          </Link>
          <Link
            to="/spotify-data"
            className="flex items-center space-x-2 hover:text-browny"
          >
            <Music className="w-5 h-5 text-white" />
            <span>Music</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-2 hover:text-browny"
          >
            <User className="w-5 h-5 text-white" />
            <span>login</span>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <div onClick={toggleMenu} className="ml-2 cursor-pointer">
            {isMenuOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start bg-gray-800">
          <Link
            to="/"
            className="text-base py-3 px-4 hover:text-browny flex items-center space-x-2"
          >
            <HomeIcon className="w-5 h-5 text-white" />
            <span>Home</span>
          </Link>
          <Link
            to="/recipes"
            className="text-base py-3 px-4 hover:text-browny flex items-center space-x-2"
          >
            <Utensils className="w-5 h-5 text-white" />
            <span>Recipes</span>
          </Link>
          <Link
            to="/cocktails"
            className="text-base py-3 px-4 hover:text-browny flex items-center space-x-2"
          >
            <Wine className="w-5 h-5 text-white" />
            <span>Drinks</span>
          </Link>
          <Link
            to="/spotify-data"
            className="text-base py-3 px-4 hover:text-browny flex items-center space-x-2"
          >
            <Music className="w-5 h-5 text-white" />
            <span>Music</span>
          </Link>
          <Link
            to="/login"
            className="text-base py-3 px-4 hover:text-browny flex items-center space-x-2"
          >
            <User className="w-5 h-5 text-white" />
            <span>Login</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
