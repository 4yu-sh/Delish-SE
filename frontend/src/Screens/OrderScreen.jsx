import React from "react";
import { Link, useParams } from "react-router-dom";
import Messsage from "../Components/Message";
import Loader from "../Components/Loader";
import {
  useGetOrderByIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrderByIdQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
    } catch (error) {
      <Messsage variant="danger">{error?.data?.message || error}</Messsage>;
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error}</Messsage>
  ) : (
    <>
      <div className="mt-20 ml-8">
        <h1 className="text-3xl">Order {order._id}</h1>
        <div className="flex gap-16">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode}
            </p>
            {order.isDelivered ? (
              <Messsage variant="alert-success">
                Delivered on {order.deliveredAt}
              </Messsage>
            ) : (
              <Messsage variant="alert-error">Not Delivered</Messsage>
            )}
            <div>
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <>
                  <button
                    onClick={deliverOrderHandler}
                    className="btn btn-primary"
                  >
                    Mark As Delivered
                  </button>
                </>
              )}
            </div>

            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Messsage variant="alert-success">
                Paid on {order.paidAt}
              </Messsage>
            ) : (
              <Messsage variant="alert-error">Not Paid</Messsage>
            )}
          </div>
          <div>
            <h1>Order Items</h1>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="text-center ">
                {order.orderItems.map((item) => (
                  <tr key={item.product}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-15 rounded-full"
                      />
                    </td>
                    <td>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td>{item.quantity}</td>
                    <td>NRS {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Order Summary</h2>
            <div>
              <p>
                <strong>Items Price</strong>
                <span>${order.itemsPrice}</span>
              </p>
              <p>
                <strong>Shipping</strong>
                <span>${order.shippingPrice}</span>
              </p>
              <p>
                <strong>Tax</strong>
                <span>${order.taxPrice}</span>
              </p>
              <p>
                <strong>Total</strong>
                <span>${order.totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
