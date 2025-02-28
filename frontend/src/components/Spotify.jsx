import { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowLeft,
  ArrowRight,
  Search,
} from "lucide-react";
import Navbar from "./NavBar";

const Spotify = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [newReleases, setNewReleases] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [deviceReady, setDeviceReady] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const scrollRef = useRef(null);
  const [trackList, setTrackList] = useState([]);
  const [isAlbumPlaying, setIsAlbumPlaying] = useState(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const player = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("access_token");

    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
      localStorage.setItem("spotify_access_token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) setAccessToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchNewReleases = async () => {
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/browse/new-releases",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          setNewReleases(data.albums.items || []);
        } catch (error) {
          console.error("Error fetching new releases:", error);
        }
      };

      const fetchTopTracks = async () => {
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/top/tracks",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          setTopTracks(data.items || []);
        } catch (error) {
          console.error("Error fetching top tracks:", error);
        }
      };

      fetchNewReleases();
      fetchTopTracks();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    let script = document.getElementById("spotify-sdk");
    if (!script) {
      script = document.createElement("script");
      script.id = "spotify-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: "Spotify React Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      newPlayer.addListener("ready", ({ device_id }) => {
        setDeviceReady(true);
        setDeviceId(device_id);
        console.log("The Web Playback SDK is ready with device ID", device_id);
      });

      newPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      newPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;
        console.log("Player State Changed:", state);
        setIsPlaying(!state.paused);
        setCurrentTrack(state.track_window.current_track);
        setProgress(state.position);
        setDuration(state.track_window.current_track.duration_ms);
      });

      newPlayer.connect();
      player.current = newPlayer;
    };

    window.onSpotifyWebPlaybackSDKReady = handleSDKReady;


  }, [accessToken]);

  const fetchAlbumTracks = (albumId) => {
    fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setTrackList(data.items);
          setCurrentTrackIndex(0);
          setIsAlbumPlaying(true);

          playTrack(data.items[0].uri);
        }
      })
      .catch((error) => {
        console.error("Error fetching album tracks:", error);
      });
  };

 const playTrack = async (trackUri, trackListSource = []) => {
   if (!player.current || !deviceReady || !deviceId) {
     console.error("Player is not initialized yet or device not ready.");
     return;
   }
   try {
     console.log("Playing track:", trackUri);
     await fetch(
       `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${accessToken}`,
         },
         body: JSON.stringify({ uris: [trackUri] }),
       }
     );
     if (trackListSource.length > 0) {
       setTrackList(trackListSource);
       setIsAlbumPlaying(false);
     } else {
       setTrackList([{ uri: trackUri }]);
       setCurrentTrackIndex(0);
       setIsAlbumPlaying(false);
     }
   } catch (error) {
     console.error("Error playing track:", error);
   }
 };

  const handlePausePlay = async () => {
    if (!deviceId) {
      console.error("Device ID not set yet. Cannot play/pause.");
      return;
    }

    try {
      if (isPlaying) {
        await fetch("https://api.spotify.com/v1/me/player/pause", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsPlaying(false);
      } else {
        await fetch("https://api.spotify.com/v1/me/player/play", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const addToQueue = async (trackUri) => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}&device_id=${deviceId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Track added to queue:", trackUri);
    } catch (error) {
      console.error("Error adding track to queue:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.tracks.items || []);
    } catch (error) {
      console.error("Error searching for tracks:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleNext = async () => {
    const list = isAlbumPlaying ? trackList : topTracks;

    if (currentTrackIndex < list.length - 1) {
      const nextTrack = list[currentTrackIndex + 1];
      await playTrack(nextTrack.uri, list);
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      console.log("No more tracks.");
    }
  };

  const handlePrevious = async () => {
    const list = isAlbumPlaying ? trackList : topTracks;

    if (currentTrackIndex > 0) {
      const prevTrack = list[currentTrackIndex - 1];
      await playTrack(prevTrack.uri, list);
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else {
      console.log("Already at the first track.");
    }
  };

  const handleSeek = (value) => {
    if (player.current) {
      player.current.seek(value);
      setProgress(value);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-screen-3xl mx-auto px-4 md:px-12 lg:px-20">
        <div className="relative mx-auto my-8 bg-bg-4 bg-cover bg-top bg-no-repeat w-full text-center py-12 md:py-16 px-4 md:px-6 rounded-md shadow-lg">
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
          <div className="relative z-10">
            <h1 className="w-full text-4xl md:text-5xl font-bold font-poppins text-white opacity-90">
              Discover Amazing Music 🎶
            </h1>
            <p className="text-gray-200 mt-2 max-w-2xl mx-auto text-sm md:text-lg">
              Immerse yourself in our handpicked selection of tracks and albums.
              Whether you’re into upbeat hits or smooth, mellow tunes, find the
              perfect sound to match your mood.
            </p>
          </div>
        </div>
      </div>

      <div className="text-white px-4 md:px-8 lg:px-20 py-4">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-center animate-colorChange">
          Spotify Music
        </h1>

        <div className="flex justify-center my-6 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative w-full max-w-7xl">
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 mt-1 rounded-lg max-h-60 overflow-y-auto z-10 w-full">
                {searchResults.map((track, index) => (
                  <div
                    key={track.id}
                    className="p-4 cursor-pointer hover:bg-gray-700 transition flex items-center"
                    onClick={() => {
                      setCurrentTrack({ ...track });
                      setTimeout(() => {
                        playTrack(track.uri, searchResults);
                      }, 100);
                      if (index === 0 && searchResults.length > 1) {
                        addToQueue(searchResults[1].uri);
                      }
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="text-sm sm:text-lg">{track.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 md:px-0 lg:px-1">
          <section className="relative mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold font-poppins">
              Top Tracks
            </h2>
            <div className="relative">
              <button
                onClick={() =>
                  scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
                }
                className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
              >
                <ArrowLeft size={24} />
              </button>

              <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide scroll-smooth"
              >
                {topTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex-shrink-0 bg-gray-800 rounded-lg p-4 w-56 sm:w-64 md:w-72 cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={async () => {
                      await playTrack(track.uri);
                      if (index < topTracks.length - 1) {
                        addToQueue(topTracks[index + 1].uri);
                      }
                    }}
                  >
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md mb-4"
                    />
                    <p className="text-sm sm:text-base font-semibold font-poppins">
                      {track.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 font-poppins">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
                }
                className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold font-poppins mb-4">
              New Releases
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {newReleases.map((album) => (
                <div
                  key={album.id}
                  className="bg-gray-800 p-3 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => fetchAlbumTracks(album.id)}
                >
                  <img
                    src={album.images[0]?.url}
                    alt={album.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
                  />
                  <p className="mt-2 text-sm sm:text-lg font-poppins font-semibold">
                    {album.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 font-poppins">
                    {album.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {currentTrack && (
          <section className="fixed bottom-0 left-0 w-full bg-gray-900 border-t-4 border-gray-700 shadow-lg z-50 pb-3">
            <div className="px-4 py-2">
              <div className="hidden md:flex items-center justify-between">
                <div className="w-1/3 flex items-center space-x-4">
                  <img
                    src={currentTrack.album.images[0]?.url}
                    alt={currentTrack.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold font-poppins">
                      {currentTrack.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-poppins">
                      {currentTrack.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="w-1/3 flex items-center justify-center space-x-4">
                  <button onClick={handlePrevious} className="text-white p-2">
                    <SkipBack fill="white" />
                  </button>
                  <button onClick={handlePausePlay} className="text-white p-2">
                    {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
                  </button>
                  <button onClick={handleNext} className="text-white p-2">
                    <SkipForward fill="white" />
                  </button>
                </div>
                <div className="w-1/3" />
              </div>

              <div className="flex flex-col md:hidden items-center">
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={currentTrack.album.images[0]?.url}
                    alt={currentTrack.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-base font-semibold font-poppins">
                      {currentTrack.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-poppins">
                      {currentTrack.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <button onClick={handlePrevious} className="text-white p-2">
                    <SkipBack fill="white" />
                  </button>
                  <button onClick={handlePausePlay} className="text-white p-2">
                    {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
                  </button>
                  <button onClick={handleNext} className="text-white p-2">
                    <SkipForward fill="white" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mt-2">
                <span className="text-xs md:text-sm">
                  {formatTime(progress)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={progress}
                  onChange={(e) => handleSeek(parseInt(e.target.value))}
                  className="w-full max-w-[250px] mx-2"
                />
                <span className="text-xs md:text-sm">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Spotify;
