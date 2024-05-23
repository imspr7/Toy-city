import Carousel from "react-bootstrap/Carousel";
import "../styles/Carousel.css";

//advertisement
function ProductCarousel({ product }) {
  return (
    <Carousel>
      {product.images.map((each) => {
        return (
          <Carousel.Item key={each.public_id}>
            <img
              className="d-block w-100"
              src={each.url}
              alt="product images"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ProductCarousel;
