"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useEdgeStore } from "../../../lib/edgestore";
import axios from "axios";

export default function Page({ isOpen, onClose, gh, categoryid }) {
  const [productName, setproductName] = useState("");
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState({});
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    if (!file) return;
    try {
      let fileURL;
      if (file) {
        const uploadResponse = await edgestore.myProtectedFiles.upload({
          file,
          onProgressChange: (progressValue) => {
            setProgress(progressValue);
          },
        });
        fileURL = uploadResponse.url;
        setLoading(0);
        setProgress(0);
        let response = await axios.post("/api/addproduct", {
        productName,
          description,
          categoryid,
          fileURL,
          Price,
        });
       // console.log(response);
        const mes = response.data;
        gh(mes);
        setLoad(false);
        onClose();
      }
    } catch (error) {
      console.log("Error in Creating Course:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="relative bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-sm md:max-w-lg transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black-500 hover:text-gray-700 transition duration-150"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-2 border-blue-500">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Product Name:
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setproductName(e.target.value)}
              className="w-full text-sm text-gray-900 md:text-base p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
                Product Description:
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-30px text-gray-700 text-sm md:text-base p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150 resize-y"
                required
            />
            </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Product Price:
            </label>
            <input
              type="text"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-gray-700 text-sm md:text-base p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
              required
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Upload File:
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 transition-colors duration-150 focus:border-blue-500 focus:ring-blue-200 focus:ring-2"
            />
            <div className="h-[6px] bg-gray-200 w-full border rounded overflow-hidden mb-2 mt-2">
              <div
                className="h-full bg-blue-600 transition-all duration-150"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 md:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 md:px-4 md:py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 text-sm md:text-base w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 text-sm md:text-base w-1/2"
            >
              {load ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
