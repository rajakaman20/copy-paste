import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.Paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((pastes) =>
    pastes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted");
  }

  async function handleShare(paste) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        toast.error("Error sharing the content.");
        console.error("Share failed:", error);
      }
    } else {
      toast.error("Sharing is not supported on this browser.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-white py-10 px-6 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          All Pastes
        </h1>

        <input
          type="search"
          className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-8 text-gray-700"
          placeholder="Search Here by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col gap-6">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div
                key={paste._id}
                className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {paste.title}
                </h2>
                <p className="text-gray-800 whitespace-pre-wrap mb-4">
                  {paste.content}
                </p>

                <div className="flex flex-wrap gap-3 justify-start mb-3">
                  <Link to={`/?pasteId=${paste._id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                      Edit
                    </button>
                  </Link>

                  <Link to={`/Paste/${paste._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Share
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No matching pastes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
