import React, { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getOrderById } from "../redux/actions/orderAction";

//view order
const ViewOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placedAt = (date) => {
    const formattedDate = new Date(date).toLocaleString();
    return formattedDate;
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  const { order, loading } = useSelector((state) => state.viewOrder);

  if (loading) return <Loading />;
  if (!loading && order)
    return (
      <Container
        className="pt-4"
        style={{ position: "relative", marginTop: "5%" }}
      >
        <Button
          style={{ marginBottom: "10px" }}
          onClick={() => navigate(-1)}
          variant="primary"
        >
          Go Back
        </Button>
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order ID</td>
              <td>{order._id}</td>
            </tr>
            <tr>
              <td>Products ID</td>
              <td>{order.products.join(",")}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{order.user_id}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{order.status}</td>
            </tr>
            <tr>
              <td>Order Value</td>
              <td>${order.totalPrice}</td>
            </tr>
            <tr>
              <td>Placed At</td>
              <td>{placedAt(order.placed_at)}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{order.address}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{order.country}</td>
            </tr>
            <tr>
              <td>User Email</td>
              <td>{order.user[0].email}</td>
            </tr>
            <tr>
              <td>USer Name</td>
              <td>{order.user[0].name}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
};

export default ViewOrder;
