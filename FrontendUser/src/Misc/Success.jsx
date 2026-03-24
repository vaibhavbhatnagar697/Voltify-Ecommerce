import { CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("order_id");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[420px] text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>

        <p className="text-gray-500 mt-2">
          Your transaction has been completed successfully.
        </p>

        {/* Transaction Info */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{query}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-red-500 font-medium">Success</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            View Order
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
export default Success;
