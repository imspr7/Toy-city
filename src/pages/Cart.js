import axios from "../api";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../redux/actions/userAction";

import CheckoutForm from "../components/CheckoutForm";

//card
const Cart = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!user) navigate("/");
    else {
      const total = user.carts.reduce(
        (acc, each) => acc + +each.price * +each.quantity,
        0
      );

      setTotalPrice(total);
    }
  }, [totalPrice]);

  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <Col>
          <h1 className="pt-2 h3">Shopping cart</h1>
          {user.carts.length === 0 ? (
            <Alert variant="info">
              Shopping cart is empty. Add products to your cart
            </Alert>
          ) : (
            <CheckoutForm totalPrice={totalPrice} />
          )}
        </Col>
        {user.carts.length > 0 && totalPrice > 0 && (
          <Col md={5}>
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop through cart products */}
                  {user.carts.map((item, i) => (
                    <tr key={i}>
                      <td>&nbsp;</td>
                      <td>
                        <i
                          className="fa fa-times"
                          style={{ marginRight: 10, cursor: "pointer" }}
                          onClick={() => {
                            axios
                              .delete(`/users/remove-from-cart/${item._id}`)
                              .then((response) => {
                                toast.warn(response.data);
                                dispatch(updateUser(user._id));
                              })
                              .catch((err) => console.log(err));
                          }}
                        ></i>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <span>{item.quantity}</span>
                        </span>
                      </td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: ${totalPrice}</h3>
              </div>
            </>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
