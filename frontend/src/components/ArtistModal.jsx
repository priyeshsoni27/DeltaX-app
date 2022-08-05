import axios from "axios";
import React, { useState } from "react";

const ArtistModal = ({ data, updateData }) => {
  const [formValue, SetFormValue] = useState({
    name: "",
    dob: "",
    bio: "",
  });
  const handleChange = (event) => {
    SetFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const addArtist = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/info/artist", {
        name: formValue.name,
        dob: formValue.dob,
        bio: formValue.bio,
      });
    } catch (error) {
      console.log(error);
    }
    updateData(!data);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Artist</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <form action="#" onSubmit={addArtist} method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Artist Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 border-2 rounded"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="Date"
                          name="dob"
                          id="dob"
                          required
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border-gray-400 border-2 rounded"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          id="bio"
                          onChange={handleChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 border-2 rounded"
                        ></textarea>
                      </div>
                      <div className="col-span-6 sm:col-span-4 bg-black text-white flex justify-center w-20 rounded">
                        <button type="submit">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateData(!data)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ArtistModal;
