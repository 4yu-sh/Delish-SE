import React from "react";
import { useState } from "react";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../Components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    navigate("/payment");
  };

  return (
    <>
      <div className="mt-20 pl-10">
        <CheckoutSteps step1 step2 />
        <form onSubmit={submitHandler}>
          <FormContainer>
            <div className="w-96 m-auto my-36 ">
              <h1 className="text-3xl font-bold text-center">Shipping</h1>
              <div className="mb-3">
                <label
                  htmlFor="address"
                  className="block text-lg font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Address"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="city"
                  className="block text-lg font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter City"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="postalCode"
                  className="block text-lg font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Postal Code"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full  bg-amber-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded m-auto "
                >
                  Continue to payment
                </button>
              </div>
            </div>
          </FormContainer>
        </form>
      </div>
      ;
    </>
  );
};

export default ShippingScreen;
