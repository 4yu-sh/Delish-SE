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
      <div className="mt-20 ml-10">
        <CheckoutSteps step1 step2 step3 />
        <FormContainer>
          <form onSubmit={submitHandler}>
            <label
              htmlFor="legend"
              className="block text-lg font-medium text-gray-700"
            >
              Payment Method
            </label>
            <div className="grid grid-flow-col grid-cols-2 w-full">
              <div className="mt-1 ">
                <div className="w-full">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="Paypal"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-2 font-medium text-gray-700"
                  >
                    Paypal
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Card"
                    name="paymentMethod"
                    value="Card"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="Card"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    Card
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="Stripe"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="stripe"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    Stripe
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Esewa"
                    name="paymentMethod"
                    value="Esewa"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="Esewa"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    Esewa
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="CashOnDelivery"
                    name="paymentMethod"
                    value="Cash On Delivery"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="CashOnDelivery"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    Cash On Delivery
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Khalti"
                    name="paymentMethod"
                    value="Khalti"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="Khalti"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    Khalti
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IMEPay"
                    name="paymentMethod"
                    value="IME Pay"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label
                    htmlFor="IMEPay"
                    className="ml-2 text-lg font-medium text-gray-700"
                  >
                    IME Pay
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full  bg-amber-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded m-auto "
              >
                Continue
              </button>
            </div>
          </form>
        </FormContainer>
      </div>
    </>
  );
};

export default PaymentScreen;
