import React from "react";
import { Link } from "react-router-dom";
import Freshness from "./Freshness";

const ProductSection = ({ products }) => {
  return (
    <>
      <Link to={`/product/${products._id}`}>
        <div key={products.id} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={products.imageSrc}
              alt={products.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="flex place-content-between">
            <h3 className="mt-4 text-base text-gray-700 font-primary h-[1.5em]  text-ellipsis overflow-hidden whitespace-nowrap">
              {products.name}
            </h3>
            <h4 className="mt-4    text-right text-xs font-medium text-gray-900 font-secondary">
              {products.location}{" "}
            </h4>
          </div>
          <div className="flex place-content-between">
            <div className="mt-1 text-lg font-medium text-gray-900 font-currency">
              NRS {products.price} /{products.unit}
            </div>
            <div>
              <Freshness value={products.freshness} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductSection;
