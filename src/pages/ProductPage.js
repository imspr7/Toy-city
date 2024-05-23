import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/Carousel";
import { getProductById } from "../redux/actions/productAction";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import axios from "../api";
import { toast } from "react-toastify";
import { updateUser } from "../redux/actions/userAction";

//product page
const ProductPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);
  const { product } = useSelector((state) => state.product);
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (count < 1) toast.warn("Please select a quantity");
    else
      axios
        .post("/users/add-to-cart", {
          userId: user._id,
          name: product.name,
          quantity: count,
          image: product.images[0].url,
          price: product.price,
          productId: product._id,
        })
        .then((response) => {
          toast(response.data.message);
          dispatch(updateUser(user._id));
        })
        .catch((err) => console.log(err));
  };
  if (!product) return <Loading />;
  return (
    <Container
      className="pt-4"
      style={{ position: "relative", marginTop: "10%" }}
    >
      <Row>
        <Col lg={6}>
          {" "}
          <ProductCarousel product={product} />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product__price">
            <strong>Price :</strong> ${product.price}
          </p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong> {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
                onChange={(e) => setCount(+e.target.value)}
              >
                <option>Select Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button onClick={handleAddToCart} size="lg">
                Add to cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/edit/${product._id}`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
