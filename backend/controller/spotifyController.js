import axios from "axios";
import { SPOTIFY_CONFIG } from "../spotifyConfig.js";
import { generateAndSetJWT } from "../authUtils.js";
const { clientId, clientSecret, redirectUri } = SPOTIFY_CONFIG;

// This is use to login into the users spotify account 
export const login = (req, res) => {
  const scope =
    "streaming user-library-read user-top-read app-remote-control user-read-playback-state";
  const state = Math.random().toString(36).substring(7);
  req.session.state = state;

  console.log("Redirect URI:", redirectUri);

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authUrl);
};

//This is use to redirect the users to after the get authorize in the spotify to music page
export const callback = async (req, res) => {
  const { code, state } = req.query;

  if (!state || state !== req.session.state) {
    return res.status(400).json({ message: "State mismatch or missing" });
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, scope } = tokenResponse.data;

    console.log("Access token:", access_token);
    console.log("Scopes:", scope); 

    req.session.accessToken = access_token;
    req.session.refreshToken = refresh_token;

    const jwtPayload = { access_token, refresh_token };

    generateAndSetJWT(jwtPayload, res);

    res.redirect(
      `https://tastyvibe.onrender.com/spotify-data?access_token=${access_token}`
    );
  } catch (error) {
    console.error("Error getting access token:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    res.status(500).json({ message: "Error getting access token" });
  }
};
