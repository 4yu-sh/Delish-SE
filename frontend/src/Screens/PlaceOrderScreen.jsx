import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  //   const placeOrderHandler = async () => {
  //     try {
  //       const res = await createOrder({
  //         orderItems: cart.cartItems,
  //         shippingAddress: cart.shippingAddress,
  //         paymentMethod: cart.paymentMethod,
  //         itemsPrice: cart.itemsPrice,
  //         shippingPrice: cart.shippingPrice,
  //         taxPrice: cart.taxPrice,
  //         totalPrice: cart.totalPrice,
  //       }).unwrap();
  //       dispatch(clearCartItems());
  //       if (res.status === "success") {
  //         navigate(`/order/${res.data._id}`);
  //       } else {
  //         toast.error("Failed to place order");
  //       }
  //     } catch (error) {
  //       toast.error("Error placing order");
  //     }
  //   };
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          image: item.imageSrc,
          quantity: item.qty,
        })),
        quantity: cart.cartItems.length,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  return (
    <>
      <div>
        <div className="mt-20 ml-6 ">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
        <div>
          <div className="my-2 mx-5">
            <div>
              <h1 className="text-3xl font-bold">Shipping</h1>
              <hr className="my-2 bg-black h-1"></hr>
              <div>
                <strong>Address:</strong>
                <div className="flex flex-row">
                  Address: {cart.shippingAddress.address}
                  <br></br>
                  City: {cart.shippingAddress.city}
                  <br></br>
                  Postal Code: {cart.shippingAddress.postalCode}
                </div>
              </div>
            </div>
            <div className="border-y-2 border-dotted p-2 border-black">
              <strong>Payment Method : </strong>
              {cart.paymentMethod}
            </div>

            {/* ORDERD ITEMS */}
            <div className="border-b-2 border-dotted p-2 border-black">
              <h1 className="text-2xl mt-3">Ordered Items</h1>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex gap-3 py-5 ">
                      <div>
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          height={175}
                          width={175}
                          className="rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="font-primary text-xl">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="font-secondary">
                          Quantity: {item.qty}
                        </div>
                        <div className="font-secondary">
                          Price (unit): NRS {item.price}
                        </div>
                        <div>
                          {item.qty} x NRS {item.price} = NRS
                          {item.qty * item.price}
                        </div>
                        <div>Total: NRS {item.qty * item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="ml-10">
            <div>
              <h1 className="font-heading text-2xl py-2">Order Summary</h1>
            </div>
            <div className="flex gap-x-10  m-auto">
              <div>
                <strong>Items: </strong>NRS {cart.itemsPrice}
              </div>
              <div>
                <strong>Shipping: </strong>NRS {cart.shippingPrice}
              </div>

              <div>
                <strong>Tax: </strong>NRS {cart.taxPrice}
              </div>

              <div>
                <strong>Total: </strong>NRS {cart.totalPrice}
              </div>
            </div>
            <div>
              {error && (
                <Message variant="danger">{error.data.message}</Message>
              )}
            </div>
            <div className="my-4">
              <button
                type="button"
                className="btn btn-ghost font-primary "
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
            <div>{isLoading && <Loader />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
