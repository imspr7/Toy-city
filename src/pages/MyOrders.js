import React, { useEffect, useState } from "react";
import { Alert, Badge, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api";
import Loading from "../components/Loading";
import { getMyOrders } from "../redux/actions/orderAction";

//order page
const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.myOrders);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyOrders(user._id));
    setIsLoading(loading);
  }, []);

  const placedAt = (date) => {
    const formattedDate = new Date(date).toLocaleString();
    return formattedDate;
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h1 className="text-center">Your orders</h1>
      {orders.length === 0 ? (
        <Alert variant="info">No orders placed yet. Continue Shopping...</Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#OrderID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <Badge
                    bg={`${
                      order.status == "processing" ? "warning" : "success"
                    }`}
                    text="white"
                  >
                    {order.status}
                  </Badge>
                </td>
                <td>{placedAt(order.placed_at)}</td>

                <td>${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyOrders;
