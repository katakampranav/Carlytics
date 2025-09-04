import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CarForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    additional_info: "",
  });
  const [preview, setPreview] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file)); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Please upload a car image!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("additional_info", formData.additional_info);

      const res = await axios.post(
        "http://localhost:8000/predict_sale/analysis",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate("/result", { state: { result: res.data } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {loading && <p className="text-gray-600">Sending data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Upload Section */}
      <div>
        <label htmlFor="image" className="block text-lg font-semibold text-gray-800 mb-2">
          Upload Car Image
        </label>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Car Preview"
              className="h-64 object-contain rounded-lg border border-gray-300"
            />
          </div>
        )}

        <div className="flex justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 hover:bg-gray-100 transition cursor-pointer">
          <div className="text-center">
            <PhotoIcon aria-hidden="true" className="mx-auto h-16 w-16 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="image"
                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">Car Details</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            name="additional_info"
            rows={3}
            placeholder="e.g. Year, Mileage, Fuel, Transmission, City, Recently serviced, new tires, minor scratches..."
            className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={formData.additional_info}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Get Price Estimate
        </button>
      </div>
    </form>
  );
};

export default CarForm;
