import { Outlet, useLocation } from "react-router-dom";
import Spotify from "./Spotify";

const SpotifyGlobal = () => {
  const location = useLocation();

  const hideSpotifyRegex =
    /^(\/$|\/login|\/cocktails|\/recipes|\/recipe\/|\/cocktail\/)/;

  const shouldHideSpotify = hideSpotifyRegex.test(location.pathname);
  return (
    <div>
      <div
        className={`spotify-player-wrapper ${
          shouldHideSpotify ? "hidden" : "block"
        }`}
      >
        <Spotify />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SpotifyGlobal;
