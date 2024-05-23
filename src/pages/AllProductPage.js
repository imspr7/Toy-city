import React, { useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import { getProductsByCategory } from "../redux/actions/productAction";

// All product
const AllProductPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [category, dispatch]);
  const { products, loading } = useSelector((state) => state.category);
  if (loading) return <Loading />;
  if (!loading && products.length < 1)
    return (
      <Container>
        <Alert variant="info">
          No Products found based on category : {category}
        </Alert>
      </Container>
    );
  else {
    return (
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              {products.map((product) => (
                <ProductPreview product={product} key={product._id} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default AllProductPage;
