import { useState } from "react";

const Images = ({ images }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
      {/* 🔥 Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.image_url}
            onClick={() => setIndex(i)}
            className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 transition ${
              i === index
                ? "border-black scale-105"
                : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {/* 🔥 Main Image */}
      <div className="relative flex-1 group">
        {/* Image container */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={images[index].image_url}
            alt="product"
            className="w-full h-[400px] object-cover rounded-2xl transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* 🔥 Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg hover:scale-110 transition p-2 rounded-full"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg hover:scale-110 transition p-2 rounded-full"
        >
          ▶
        </button>

        {/* 🔥 Image Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Images;
