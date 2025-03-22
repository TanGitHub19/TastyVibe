import Navbar from "../components/NavBar";

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://tastyvibe.onrender.com/api/spotify/login";
  };

  return (
    <div className="bg-gray-900 h-screen overflow-hidden">
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center text-white font-poppins">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to TastyVibe</h1>
          <p className="text-gray-400 mb-6">
            Login to access your Spotify playlist
          </p>
          <button
            onClick={handleLogin}
            className="bg-green-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-green-600 transition"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
