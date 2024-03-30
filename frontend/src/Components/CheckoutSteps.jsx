import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          {step1 ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>Login</li>
          )}

          {step2 ? (
            <li>
              <Link to="/shipping">Shipping</Link>
            </li>
          ) : (
            <li>Shipping</li>
          )}

          {step3 ? (
            <li>
              <Link to="/payment">Payment</Link>
            </li>
          ) : (
            <li>Payment</li>
          )}

          {step4 ? (
            <li>
              <Link to="/placeorder">Place Order</Link>
            </li>
          ) : (
            <li>Place Order</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CheckoutSteps;
