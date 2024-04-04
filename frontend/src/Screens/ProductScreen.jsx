import { Link, useParams } from "react-router-dom";
import Freshness from "../Components/Freshness";
import {
  useGetProductsDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Message from "../Components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductsDetailsQuery(productId);

  const [
    createReview,
    { isLoading: loadingProductReview, error: reviewError },
  ] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
          <div className="review">
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <div>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                      <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
                        Testimonials
                      </h1>
                      <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/2 w-full">
                          <div className="h-full bg-gray-100 p-8 rounded">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="block w-5 h-5 text-gray-400 mb-4"
                              viewBox="0 0 975.036 975.036"
                            >
                              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                            </svg>
                            <p className="leading-relaxed mb-6">
                              {review.comment}
                            </p>
                            <a className="inline-flex items-center">
                              <img
                                alt="testimonial"
                                src="https://dummyimage.com/106x106"
                                className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                              />
                              <span className="flex-grow flex flex-col pl-4">
                                <span className="title-font font-medium text-gray-900">
                                  {review.name}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {review.createdAt.substring(0, 10)}
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-heading text-3xl">Write a Customer Review</h2>
              {loadingProductReview && <Loader />}

              {reviewError && (
                <Message variant="error">
                  {reviewError?.data?.message || reviewError.error}
                </Message>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col">
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border-2 rounded-lg"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border-2 rounded-lg"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg w-full"
                    disabled={loadingProductReview}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
