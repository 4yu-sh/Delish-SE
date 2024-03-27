import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Freshness from "../Components/Freshness";

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link className="btn btn-ghost my-3" to="/">
        Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div>
          <img src={product.imageSrc} alt={product.imageAlt} />
        </div>
        <div className="p-10">
          <div>
            <h2 className="font-heading text-5xl m-auto text-center    ">
              {product.name}
            </h2>
            <p className="font-sub text-3xl text-pretty mt-4">
              {product.description}
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-currency font-semibold text-5xl py-9 flex place-content-between ">
              <span>
                Price: {product.price} / {product.unit}
              </span>
              <span>
                <Freshness value={product.freshness} />
              </span>
            </h3>

            <div className="flex place-content-around">
              <div>
                <h3 className="font-secondary text-xl ">
                  Harvested At: {product.dateHarvested}
                </h3>
                <h3 className="font-secondary text-xl ">
                  Location: {product.location}
                </h3>
              </div>
              <div>
                <h3 className="font-primary font-semibold text-3xl">
                  Available: {product.countInStock} {product.unit}
                </h3>
              </div>
            </div>
            <h3 className="font-secondary text-2xl m-5">
              By: {product.seller}
            </h3>
          </div>
          <div className="flex place-content-around gap-3">
            <button
              className="btn btn-lg w-1/2 hover:btn-outline "
              disabled={product.countInStock == 0}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-lg w-1/2 hover:btn-outline "
              disabled={product.countInStock == 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
