import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Navbar from "./../components/Navbar";
const Home = () => {
  const navigate = useNavigate();
  const [showSongs, SetShowSongs] = useState(true);
  const [songs, SetSongs] = useState([]);
  const [artists, SetArtists] = useState([]);
  const [ratings, SetRating] = useState(0);
  const getSongs = async () => {
    try {
      const topSongs = await axios.get("http://localhost:5000/info/top10songs");
      SetSongs(topSongs.data.slice(0, 10));
      console.log(songs);
    } catch (error) {
      console.log(error);
    }
  };
  function structureArtistData(topArtists) {
    const allArtist = topArtists.map((artist) => {
      artist.rating = 0;
      artist.songs.map((song) => {
        artist.rating += song.rating;
      });
      return artist;
    });
    allArtist.sort((a, b) => {
      return b.rating - a.rating;
    });
    SetArtists(allArtist);
  }
  const getArtists = async () => {
    try {
      await axios.get("http://localhost:5000/info/top10artist").then((res) => {
        // SetArtists(res.data)
        structureArtistData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const ratingChanged = (newRating) => {
    SetRating(newRating);
  };
  const submitRating = async (songid) => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("userCred"));
      await axios.patch("http://localhost:5000/info/updaterating", {
        songId: songid,
        userId: userId.id,
        rating: ratings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongs();
    getArtists();
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4">
        <div className="h-full col-span-1 w-32  bg-black text-green-600 flex flex-col space-y-20 items-center text-xl pt-8 font-medium">
          <button
            style={{ color: "#1DB954", backgroundColor: "black" }}
            className="bg-slate-400 w-full py-2"
            onClick={() => SetShowSongs(true)}
          >
            Songs
          </button>
          <button
            style={{ color: "#1DB954", backgroundColor: "black" }}
            className="bg-slate-400 w-full py-2"
            onClick={() => SetShowSongs(false)}
          >
            Artist
          </button>
          {showSongs && (
            <button
              style={{ color: "#1DB954", backgroundColor: "black" }}
              className="bg-slate-400 w-full py-2"
              onClick={() => navigate("/addsong")}
            >
              Add Song
            </button>
          )}
        </div>
        <div className="col-start-2 col-end-4">
          {showSongs === true ? (
            <div className="flex justify-center py-6 w-full">
              <div className="flex flex-col space-y-10">
                <div className="flex justify-center">
                  <span className="text-3xl font-bold">Top 10 Songs</span>
                </div>
                <div className="w-full">
                  <div className="overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left width:50% text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-black text-white dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 ">
                            Song Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Artist
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Rating
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date Of Release
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {songs.map((song) => (
                          <tr
                            key={song.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {song.title}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              <div className="flex flex-col space-y-1">
                                {song.artists.map((artist) => (
                                  <span>{artist.name}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              <div className="flex space-x-5">
                                <ReactStars
                                  count={5}
                                  onChange={ratingChanged}
                                  size={24}
                                  activeColor="#ffd700"
                                />
                                <button
                                  type="button"
                                  onClick={() => submitRating(song.id)}
                                  className="bg-black text-white rounded-sm p-1"
                                >
                                  Rate
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {song.date_of_release
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-6">
              <div className="flex flex-col space-y-10">
                <div className="flex justify-center">
                  <span className="text-3xl font-bold">Top 10 Artists</span>
                </div>
                <div className="max-w-2xl mx-auto">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 bg-black dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Artist name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Song
                          </th>
                          <th scope="col" className="px-6 py-3">
                            DOB
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Bio
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {artists.map((artist) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {artist.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              <div className="flex flex-col space-y-1">
                                {artist.songs.map((song) => (
                                  <span>{song.title}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {artist.dob
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                              {artist.bio}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
