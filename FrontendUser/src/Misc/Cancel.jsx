import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("order_id");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[420px] text-center">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>

        <p className="text-gray-500 mt-2">
          Your payment was not completed. You can try again.
        </p>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{query}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-red-500 font-medium">Cancelled</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/products")}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cancel;
