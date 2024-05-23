import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import DashboardOrders from "../components/DashboardOrders";
import DashboardProducts from "../components/DashboardProducts";

// Admin Dasboard
const AdminDashboard = () => {
  return (
    <Container fluid>
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProducts />
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <DashboardOrders />
              </Tab.Pane>
              <Tab.Pane eventKey="clients">
                {/* <ClientsAdminPage /> */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;
