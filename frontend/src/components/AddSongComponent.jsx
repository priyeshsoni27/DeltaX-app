import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistModal from "./ArtistModal";
const AddSongComponent = () => {
  const navigate = useNavigate();
  const [formValue, SetFormValue] = useState({
    title: "",
    date_of_release: "",
  });

  const [artists, SetArtist] = useState([]);
  const [showModal, SetShowModal] = useState(false);
  const [artistValue, SetArtistValue] = useState(-1);

  const handleChange = (event) => {
    SetFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeArtist = (e) => {
    console.log(typeof e.target.value);
    SetArtistValue(Number(e.target.value));
  };

  const getArtists = async () => {
    const response = await axios.get("http://localhost:5000/info/allartist");
    SetArtist(response.data);
  };

  useEffect(() => {
    getArtists();
  }, [showModal]);

  const handleSubmit = async (e) => {
    window.location.reload();
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/info/song", {
          title: formValue.title,
          date_of_release: formValue.date_of_release,
        })
        .then(async (res) => {
          try {
            await axios.post("http://localhost:5000/info/artistsong", {
              songId: res.data.id,
              artistId: artistValue,
            });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center py-10 space-y-5">
      <span className="text-2xl font-medium ">Add New Song</span>
      <div>
        <form
          action="#"
          onSubmit={handleSubmit}
          method="POST"
          style={{ backgroundcolor: "blue" }}
        >
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Song Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    id="title"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 border-2 rounded"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="date_of_release"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Release
                  </label>
                  <input
                    type="Date"
                    name="date_of_release"
                    onChange={handleChange}
                    id="date_of_release"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border-gray-400 border-2 rounded"
                  />
                </div>

                <div className="col-span-6 flex space-x-5 bg-back sm:col-span-3">
                  <div>
                    <label
                      htmlFor="artist"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Artist
                    </label>
                    <select
                      id="artist"
                      name="artist"
                      value={artistValue}
                      onChange={handleChangeArtist}
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option
                        value="-1"
                        className="rounded-md"
                        selected="selected"
                      >
                        Select Artist
                      </option>
                      {artists.map((ele) => (
                        <option
                          key={ele.id}
                          value={ele.id}
                          className="capitalize rounded-md"
                        >
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => SetShowModal(!showModal)}
              className="col-span-3 sm:col-span-3 w-20 h-10 bg-black text-white w-2/5 flex justify-center  py-3 rounded cursor-pointer"
            >
              <button type="button">Add Artist</button>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      {showModal && <ArtistModal data={showModal} updateData={SetShowModal} />}
    </div>
  );
};

export default AddSongComponent;
