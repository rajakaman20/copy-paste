import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes, addToPastes } from "../Redux/PasteSlice";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast.success("Content copied to clipboard");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {pasteId ? "Update Paste" : "Create a New Paste"}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        <textarea
          className="w-full p-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] text-gray-800 resize-y"
          placeholder="Enter your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4">
          <button
            onClick={copyToClipboard}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Copy All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
