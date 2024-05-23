import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../redux/actions/productAction";
import Loading from "./Loading";
import "../styles/DashboardProducts.css";
import axios from "../api";
import { toast } from "react-toastify";

//products
const DashboardProducts = () => {
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (products.length < 1) return <Loading />;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product._id}>
              <td>
                <img
                  src={product.images[0].url}
                  className="dashboard-product-preview"
                  alt={product.name}
                />
              </td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  onClick={() => {
                    axios
                      .delete(`/product/${product._id}`)
                      .then((response) => {
                        if (response.status === 200) {
                          toast.success(response.data.message);
                          dispatch(getAllProducts());
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Delete
                </Button>
                <Link
                  to={`/product/edit/${product._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DashboardProducts;
