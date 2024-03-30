import { Link, useParams } from "react-router-dom";
import Freshness from "../Components/Freshness";
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import Message from "../Components/Message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <>
      <Link className="btn btn-ghost my-3" to="/">
        Back
      </Link>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant={error}>{error?.data?.message || error.error}</Message>
      ) : (
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

            {product.countInStock > 0 && (
              <div className="my-5 border-y-2 border-y-black border-double  p-2">
                <div className="flex place-content-between">
                  <h3 className="font-primary font-semibold text-3xl">
                    Quantity
                  </h3>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-1/4 p-2 border-2 rounded-lg text-center"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="flex place-content-around gap-3">
              <button
                className="btn btn-lg w-1/2 hover:btn-outline "
                disabled={product.countInStock == 0}
                onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
