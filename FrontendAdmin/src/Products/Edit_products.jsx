import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Misc/Loader";
import { toast } from "react-toastify";

function Edit_products() {
  const [searchquery] = useSearchParams();
  const query = searchquery.get("id");
  const [pdata, setpdata] = useState({});
  const navigate = useNavigate();
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  useEffect(() => {
    async function getProductData() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/api/productData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: query }),
          },
        );
        const data = await res.json();
        if (data.success === true) {
          setsuccess(data.msg);
          setpdata(data.product[0]);
        }
        if (data.success === false) {
          seterror(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/api/edit-products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: query, product_data: pdata }),
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        setsuccess([...success, data.msg]);
        navigate("/products-list");
        toast.success("Product Edited successfully");
      }
      if (data.success === false) {
        seterror([...error, data.msg]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (success.length > 0 || error.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Edit Product
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
                defaultValue={pdata.name}
                onChange={(e) => setpdata({ ...pdata, name: e.target.value })}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-600 mb-2">Company</label>
              <input
                type="text"
                placeholder="Enter company name"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                defaultValue={pdata.company}
                onChange={(e) =>
                  setpdata({ ...pdata, company: e.target.value })
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-600 mb-2">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                defaultValue={pdata.price}
                onChange={(e) => setpdata({ ...pdata, price: e.target.value })}
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block text-gray-600 mb-2">Discount Price</label>
              <input
                type="number"
                placeholder="Enter discount price"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                defaultValue={pdata.discountPrice}
                onChange={(e) =>
                  setpdata({ ...pdata, discountPrice: e.target.value })
                }
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-600 mb-2">Stock</label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                defaultValue={pdata.stock}
                onChange={(e) => setpdata({ ...pdata, stock: e.target.value })}
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
                    defaultValue={pdata?.specifications?.ram}
                    onChange={(e) =>
                      setpdata({
                        ...pdata,
                        specifications: {
                          ...pdata.specifications,
                          ram: e.target.value,
                        },
                      })
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
                    defaultValue={pdata?.specifications?.rom}
                    onChange={(e) =>
                      setpdata({
                        ...pdata,
                        specifications: {
                          ...pdata.specifications,
                          rom: e.target.value,
                        },
                      })
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
                    defaultValue={pdata?.specifications?.processor}
                    onChange={(e) =>
                      setpdata({
                        ...pdata,
                        specifications: {
                          ...pdata.specifications,
                          processor: e.target.value,
                        },
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
                    defaultValue={pdata?.specifications?.display}
                    onChange={(e) =>
                      setpdata({
                        ...pdata,
                        specifications: {
                          ...pdata.specifications,
                          display: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-2">Product Image</label>
              <input
                type="file"
                className="w-full border px-4 py-2 rounded-lg"
                defaultValue={pdata.image}
                onChange={(e) => setpdata({ ...pdata, image: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-2">Description</label>
              <textarea
                rows="4"
                placeholder="Enter product description"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                defaultValue={pdata.description}
                onChange={(e) =>
                  setpdata({ ...pdata, description: e.target.value })
                }
              ></textarea>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
export default Edit_products;
