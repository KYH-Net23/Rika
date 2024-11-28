import { useNavigate } from "react-router-dom";

const ErrorNotExisting = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
        <p className="text-gray-600 mb-6">
          This link does not have any content yet, but it will arrive shortly.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ErrorNotExisting;
