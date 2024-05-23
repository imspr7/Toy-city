import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../redux/actions/orderAction";
import { updateUser } from "../redux/actions/userAction";

//form
const CheckoutForm = ({ totalPrice }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  // eslint-disable-next-line
  const [paying, setPaying] = useState(false);
  const [productId, setProductId] = useState([]);
  const [cartId, setCartId] = useState([]);

  const stripePromise = loadStripe(
    "pk_test_51Ng9ZBSEuqOiZ0KG76DH0ExBaKkCY7O0EzeUx6Uxq9Uls4eMlKatwvhxkM8SujXkZeRgNqQQtpxawmvU9tOot1Vr0015sbOiO1"
  );

  useEffect(() => {
    const cartDetail = user.carts.map((cart) => cart.product_id);
    const cartIdDetail = user.carts.map((cart) => cart._id);
    setCartId(cartIdDetail);
    setProductId(cartDetail);
    // eslint-disable-next-line
  }, [productId]);

  async function handlePay(e, elements, stripe) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const orderData = {
      userId: user._id,
      productId,
      address,
      country,
      totalPrice,
      cartId,
    };

    const cardElement = elements.getElement(CardElement);
    // eslint-disable-next-line
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) console.log(error);
    else {
      setAlertMessage("Payment success");
      const orderConfirmation = await dispatch(placeOrder(orderData));
      if (orderConfirmation) {
        dispatch(updateUser(user._id));
        setTimeout(() => {
          navigate(`/orders/${user._id}`);
        }, 1200);
      }
    }
  }
  return (
    <Col className="cart-payment-container">
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <Form
              onSubmit={(e) => handlePay(e, elements, stripe)}
              className="stripe-elements"
            >
              <Row>
                {alertMessage && <Alert>{alertMessage}</Alert>}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={user.name}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={user.email}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <label htmlFor="card-element">Card</label>

              <CardElement className="" />

              <Button
                className="mt-3"
                type="submit"
                disabled={user?.carts.length < 1 || paying}
              >
                {paying ? "Processing..." : "Proceed to pay"}
              </Button>
            </Form>
          )}
        </ElementsConsumer>
      </Elements>
    </Col>
  );
};

export default CheckoutForm;
