import React from "react";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import Message from "../../Components/Message";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const AllOrdersScreen = () => {
  const { data, error, isLoading } = useGetOrdersQuery();

  return (
    <>
      <div className="mt-20">
        <h1>All ORDERS</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className="btn btn-primary">Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default AllOrdersScreen;
