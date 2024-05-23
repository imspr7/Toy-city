import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api";
import Loading from "./Loading";

//Dashboard
const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  function markShipped(orderId, userId) {
    axios
      .patch(`/orders/mark-shipped/${orderId}`, { userId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#OrderID</th>
          <th>Status</th>

          <th>Amount</th>
          <th>Order Detail</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.status === "processing" ? (
                  <Button
                    size="sm"
                    onClick={() => markShipped(order._id, order.user_id)}
                  >
                    Mark as shipped
                  </Button>
                ) : (
                  <Badge bg="success">Shipped</Badge>
                )}
              </td>
              <td>{order.totalPrice}</td>

              <td>
                <Link
                  to={`/viewOrder/${order._id}`}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  View order <i className="fa fa-eye"></i>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DashboardOrders;
