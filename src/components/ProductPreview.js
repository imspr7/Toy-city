import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//product p0review
const ProductPreview = ({ product }) => {
  return (
    <LinkContainer
      to={`/product/${product._id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={product.images[0].url}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Badge bg="warning" text="dark">
            {product.category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default ProductPreview;
