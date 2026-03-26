import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
          404
        </h1>

        <div className="bg-red-500 text-white px-4 py-1 text-sm rounded rotate-12 inline-block mt-2">
          Page Not Found
        </div>

        <p className="mt-6 text-gray-600 text-lg">
          Oops! The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
export default Error;
