import React from "react";
import { useState } from "react";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 />

        <label
          htmlFor="legend"
          className="block text-lg font-medium text-gray-700"
        >
          Payment Method
        </label>
        <div className="grid grid-flow-col grid-cols-2 w-full">
          <form
            onSubmit={submitHandler}
            className="flex flex-col place-content-around space-y-10 m-10"
          >
            <div className=" flex items-center space-x-4">
              <input
                onChange={(e) => setPaymentMethod(e.target.value)}
                type="radio"
                id="esewa"
                value="Esewa"
                name="paymentMethod"
                required
                checked
              />
              <img
                src="https://th.bing.com/th/id/OIP.fN2-tKH3zajr_XyM520I7wAAAA?rs=1&pid=ImgDetMain"
                height={150}
                width={150}
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="khalti"
                value="Khalti"
                name="paymentMethod"
                required
              />
              <img
                src="https://th.bing.com/th/id/OIP.ADJALfL3YRw7X_KD7TIpOgHaEI?pid=ImgDet&w=474&h=264&rs=1"
                height={150}
                width={150}
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="IME Pay"
                value="IME pay"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img
                src="https://th.bing.com/th/id/OIP.9y2oN9xbF6RqP0boI07rPQHaE0?pid=ImgDet&w=474&h=308&rs=1"
                height={150}
                width={150}
                className="rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 rounded-lg btn-amber-500 hover:bg-yellow-600"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
