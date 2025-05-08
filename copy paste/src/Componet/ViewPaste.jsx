import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.Paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="pt-28 text-center text-gray-600 text-lg">
        Paste not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-28 px-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Paste Details
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 min-h-[300px] resize-y"
          value={paste.content}
          disabled
        />
      </div>

      <p className="text-sm text-gray-500 mt-4 text-right">
        Created at: {paste.createdAt}
      </p>
    </div>
  );
}

export default ViewPaste;
