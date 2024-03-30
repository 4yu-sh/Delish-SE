import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS_URL,
      method: "GET",
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      method: "GET",
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
        body: { id },
      }),
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
        body: { id },
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = ordersApiSlice;
