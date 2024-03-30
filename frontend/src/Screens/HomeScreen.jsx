import React from "react";
import ProductSection from "../Components/ProductSection";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <div className="">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={error}>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((products) => (
                    <ProductSection key={products._id} products={products} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
