import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { Heart } from "lucide-react";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-1 inset-0 bg-bg-2 bg-cover bg-center text-white flex flex-col">
        <div className="absolute inset-0 bg-black opacity-35"></div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white text-gray-900 px-6 py-6 font-bold text-xl uppercase flex text-center items-center justify-center font-poppins">
            Taste <br />& Vibes
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-t-[20px] border-t-white"></div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 lg:px-24 max-w-4xl mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
            Welcome to TastyVibe
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto font-thin font-poppins">
            Where every meal has a beat. Explore tasty dishes and match them
            with music that brings out the best in both food and flavor.
          </p>
          <Link
            to="/recipes"
            className="mt-6 px-4 py-2 sm:px-6 sm:py-2 bg-white text-gray-900 font-bold rounded-full shadow-md hover:bg-gray-200 transition font-poppins"
          >
            START EXPLORING NOW
          </Link>
        </div>

        <div className="relative mt-auto flex flex-col items-center pb-6 sm:pb-8 md:pb-10 z-10">
          <div className="flex items-center justify-center w-full max-w-[800px] px-4">
            <div className="w-1/3 border-t border-white"></div>
            <Heart
              className="text-white text-4xl sm:text-5xl md:text-6xl mx-2 sm:mx-4"
              fill="currentColor"
            />
            <div className="w-1/3 border-t border-white"></div>
          </div>
          <p className="mt-2 text-sm sm:text-base font-poppins text-center text-shadow px-4">
            Discover new flavors and sounds. TastyVibe pairs the best meals with
            music that elevates both food and mood. <br />
            Explore our collection of recipes and tracks that bring harmony to
            your taste buds and your soul.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
