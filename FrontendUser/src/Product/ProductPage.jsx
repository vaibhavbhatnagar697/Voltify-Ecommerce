import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loader from "../Misc/Loader";
import Error from "../Misc/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function ProductPage() {
  const [productData, setproductData] = useState([]);
  const [success, setsuccess] = useState([]);
  const [error, seterror] = useState([]);
  let accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/api/view-products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        setproductData(data.productData);
        if (data.success === true) {
          setsuccess((prev) => [...prev, data.msg]);
        }
        if (data.success === false) {
          seterror((prev) => [...prev, data.msg]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  if (success.length > 0 || error.length > 0) {
    if (error.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-6 py-10 text-gray-800">
          {/* 🔥 MAIN HEADING */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Explore Premium Products
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {productData.length} items available
            </p>
          </div>

          {/* XIAOMI SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-400 pl-4">
              Xiaomi Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "Xiaomi")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className=" bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* LENOVO SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Lenovo Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "Lenovo")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* SAMSUNG SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Samsung Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "Samsung")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* APPLE SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Apple Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "Apple")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* VIVO SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Vivo Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "Vivo")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* ASUS SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Asus Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter((item) => item.company == "ASUS")
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* MISC SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              OnePlus, Hp, Motorola and Oppo Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter(
                  (item) =>
                    item.company == "OnePlus" ||
                    item.company == "Oppo" ||
                    item.company == "Motorola" ||
                    item.company == "HP",
                )
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* VLOGGING SECTION */}
          <div className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-purple-400 pl-4">
              Vlogging Products
            </h2>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
            >
              {productData
                .filter(
                  (item) =>
                    item.company == "Canon" ||
                    item.company == "Sony" ||
                    item.company == "Digitek" ||
                    item.company == "AmazonBasics" ||
                    item.company == "GoPro" ||
                    item.company == "DJI",
                )
                .map((v, i) => (
                  <SwiperSlide key={i}>
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 hover:scale-[1.03] transition duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <ProductCard products={v} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }

    if (success.length === 0) {
      return <Error />;
    }
  } else {
    return <Loader />;
  }
}

export default ProductPage;
