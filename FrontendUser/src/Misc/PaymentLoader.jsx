import { Loader2, ShieldCheck } from "lucide-react";

function PaymentLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl p-10 w-[420px] text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <Loader2 className="animate-spin text-indigo-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Processing Your Payment
        </h1>

        <p className="text-gray-500 mt-2">
          Please wait while we securely confirm your transaction.
        </p>

        {/* Steps */}
        <div className="mt-8 space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700">Connecting to payment gateway</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700">Verifying transaction</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700">Finalizing payment</span>
          </div>
        </div>

        {/* Security Message */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Secure payment powered by encrypted gateway
        </div>
      </div>
    </div>
  );
}
export default PaymentLoader;
