import React, { useState } from "react";
import { toast } from "react-toastify";
function Add_products() {
  const [Pname, setPname] = useState("");
  const [Cname, setCname] = useState("");
  const [Price, setPrice] = useState(0);
  const [DisPrice, setDisPrice] = useState(0);
  const [stock, setstock] = useState(0);
  const [images, setimages] = useState([]);
  const [desc, setdesc] = useState("");
  const [productSpec, setproductSpec] = useState({
    ram: 0,
    rom: 0,
    processor: "",
    display: "",
  });
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setimages([...images, e.target.files[0]]);
  };
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((img) => {
      formData.append("images", img);
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/api/upload-file`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      console.log(data);

      if (data.success === true) {
        setsuccess((prev) => [...prev, data.msg]);
        const productData = {
          name: Pname,
          description: desc,
          company: Cname,
          price: Price,
          discountPrice: DisPrice,
          specifications: productSpec,
          stock: stock,
          images: data.images,
        };
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/api/add-products`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            },
          );
          console.log(productData);
          const data = await res.json();
          if (data.success === true) {
            toast.success("Product Added successfully");
            setsuccess(data.msg);
          }
          if (data.success === false) {
            seterror(data.msg);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (data.success === false) {
        seterror(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(error);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Add New Product
        </h1>
        {typeof error === "string" && error !== "" && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded">
            {error}
          </div>
        )}

        {Array.isArray(error) &&
          error.map((v, i) => (
            <div
              key={i}
              className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-2"
            >
              {v.msg}
            </div>
          ))}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div>
            <label className="block text-gray-600 mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={Pname}
              onChange={(e) => setPname(e.target.value)}
            />
          </div>
          {/* Company */}
          <div>
            <label className="block text-gray-600 mb-2">Company</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={Cname}
              onChange={(e) => setCname(e.target.value)}
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-gray-600 mb-2">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {/* Discount Price */}
          <div>
            <label className="block text-gray-600 mb-2">Discount Price</label>
            <input
              type="number"
              placeholder="Enter discount price"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={DisPrice}
              onChange={(e) => setDisPrice(e.target.value)}
            />
          </div>
          {/* Stock */}
          <div>
            <label className="block text-gray-600 mb-2">Stock</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={stock}
              onChange={(e) => setstock(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Product Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RAM */}
              <div>
                <label className="block text-gray-600 mb-1">RAM (GB)</label>
                <input
                  type="number"
                  name="ram"
                  placeholder="Example: 8"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={productSpec.ram}
                  onChange={(e) =>
                    setproductSpec({ ...productSpec, ram: e.target.value })
                  }
                />
              </div>

              {/* ROM */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Storage / ROM (GB)
                </label>
                <input
                  type="number"
                  name="rom"
                  placeholder="Example: 256"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={productSpec.rom}
                  onChange={(e) =>
                    setproductSpec({ ...productSpec, rom: e.target.value })
                  }
                />
              </div>

              {/* Processor */}
              <div>
                <label className="block text-gray-600 mb-1">Processor</label>
                <input
                  type="text"
                  name="processor"
                  placeholder="Example: Intel i5 / Snapdragon 8 Gen 2"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={productSpec.processor}
                  onChange={(e) =>
                    setproductSpec({
                      ...productSpec,
                      processor: e.target.value,
                    })
                  }
                />
              </div>

              {/* Display */}
              <div>
                <label className="block text-gray-600 mb-1">Display</label>
                <input
                  type="text"
                  name="display"
                  placeholder="Example: 6.7 inch AMOLED"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={productSpec.display}
                  onChange={(e) =>
                    setproductSpec({ ...productSpec, display: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Images
            </label>

            {/* Upload Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="cursor-pointer">
                <p className="text-gray-500">Click to upload or drag & drop</p>
                <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
              </label>
            </div>

            {/* Preview Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 mb-2">Description</label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            ></textarea>
          </div>
          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Add_products;
