import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Misc/Loader";
import { toast } from "react-toastify";
function Products_list() {
  const [products, setproducts] = useState([]);
  const [Product_id, setProduct_id] = useState("");
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  useEffect(() => {
    async function get_product_list() {
      try {
        const res = await fetch(
          "http://localhost:3200/admin/api/view-products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        if (data.success === true) {
          setproducts(data.products);
          setsuccess((prev) => [...prev, data.msg]);
        }
        if (data.success === false) {
          seterror((prev) => [...prev, data.msg]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    get_product_list();
  }, [Product_id]);
  async function deleteProduct(product_id) {
    setProduct_id(product_id);
    try {
      const res = await fetch(
        "http://localhost:3200/admin/api/delete-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id }),
        },
      );
      const data = await res.json();
      if (data.success === true) {
        setsuccess([...success, data.msg]);
        toast.success("Porduct deleted successfully");
      }
      if (data.success === false) {
        seterror([...error, data.msg]);
      }
      setProduct_id("");
    } catch (error) {
      console.log(error);
    }
  }
  if (success.length > 0 || error.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Product List
        </h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Company</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((v) => (
                <tr key={v._id} className="border-b hover:bg-gray-50">
                  {/* Product */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={v?.images[0]?.image_url}
                      alt={v.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span className="font-medium">{v.name}</span>
                  </td>

                  {/* Company */}
                  <td className="p-4 text-gray-600">{v.company}</td>

                  {/* Price */}
                  <td className="p-4 text-gray-700">₹{v.price}</td>

                  {/* Discount */}
                  <td className="p-4 text-green-600 font-semibold">
                    ₹{v.discountPrice}
                  </td>

                  {/* Stock */}
                  <td className="p-4">{v.stock}</td>

                  {/* Actions */}
                  <td className="p-4 flex justify-center gap-3">
                    {/* Edit */}
                    <Link
                      to={`/edit-product?id=${v._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    {/* Delete */}
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => deleteProduct(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}
export default Products_list;
