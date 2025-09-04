import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No result found. <button className="text-indigo-600" onClick={() => navigate("/")}>Go back</button>
        </p>
      </div>
    );
  }

  const { caption, sale_prediction } = result;
  const [price, reasoning] = sale_prediction.split("### Reasoning");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Car Analysis Result</h1>


        {/* Price Estimate */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Price Estimate</h2>
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 text-gray-700 whitespace-pre-line">
            {price.replace("### Price Estimate (INR)", "").trim()}
          </div>
        </section>

        {/* Reasoning */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Reasoning</h2>
          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 text-gray-700 whitespace-pre-line">
            {reasoning.trim()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;
