import React from "react";

function Loader() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-300 rounded w-1/4"></div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((v) => (
          <div key={v} className="bg-white shadow rounded-xl p-5 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white shadow rounded-xl p-5">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((v) => (
            <div key={v} className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
