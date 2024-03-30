import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import React from "react";
import Message from "../Components/Message";
import { removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="m-10">
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <div className="my-10">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="grid grid-flow-col grid-cols-2 mx-2 my-4 p-3 "
                >
                  <Link to={`/product/${item._id}`}>
                    <div>
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        height={250}
                        width={250}
                      />
                    </div>
                    <div>
                      <div>
                        <h1 className="font-heading text-xl">
                          Product Name: {item.name}
                        </h1>
                      </div>
                      <div className="grid grid-flow-col grid-cols-2">
                        <p>Quantity: {item.qty} </p>
                        <p>Price : NRS {item.price} </p>
                      </div>

                      <p>Total Price : NRS {item.qty * item.price}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      removeFromCartHandler(item._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex place-content-around my-10">
              <h1>
                Sub Total: NRS{" "}
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )}
              </h1>
              <button className="btn" onClick={checkoutHandler}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
