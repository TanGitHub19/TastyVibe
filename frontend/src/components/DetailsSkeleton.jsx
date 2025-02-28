import { ChevronLeft } from "lucide-react";
import Navbar from "../components/NavBar";

const DetailsSkeleton = () => {
  return (
    <div className="bg-gray-900 text-white font-poppins min-h-screen">
      <Navbar />

      <div className="px-4 md:px-10">
        <button
          className="flex items-center gap-2 p-2 px-6 bg-gray-700 text-gray-500 rounded-full md:w-36 animate-pulse"
          disabled
        >
          <ChevronLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>

      <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <div className="w-full h-72 bg-gray-700 rounded-lg animate-pulse"></div>

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-40 h-8 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-40 h-8 bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="h-10 w-3/4 bg-gray-700 rounded-md animate-pulse mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-700 rounded-md animate-pulse mb-2"></div>
          <div className="h-6 w-1/2 bg-gray-700 rounded-md animate-pulse mb-2"></div>

          <div className="flex gap-4 mb-4 bg-gray-800 p-3 rounded-md w-full md:max-w-72">
            <div className="w-24 h-10 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-700 rounded-md animate-pulse"></div>
          </div>

          <div className="mb-6">
            <div className="h-8 w-1/3 bg-gray-700 rounded-md animate-pulse mb-4"></div>
            <div className="space-y-2">
              <div className="h-6 w-full bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-11/12 bg-gray-700 rounded-md animate-pulse"></div>
              <div className="h-6 w-10/12 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
