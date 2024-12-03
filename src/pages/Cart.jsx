import React, { useState, useEffect, useContext } from "react";
import useServiceCart from "../hooks/useServiceCart";
import ErrorPopup from "../components/ErrorPopup";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";


function Cart({}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");
  const { isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData && isAuthenticated() ? JSON.parse(storedData) : null;
  });


  useEffect(() => {
    getItems();
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

    window.addEventListener("userDataChanged", handleUserDataChange);

    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

  const handlePopup = (title, message, severity) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupSeverity(severity);
    setPopupOpen(true);
  };

  const getItems = async () => {
    const cart = await useServiceCart().getCart();
    setItems(cart.items);
    setTotal(cart.total);
    if (!cart.success) handlePopup("Error", "Error al cargar el carrito. Intente nuevamente.", "error");
  };

  const addProduct = async (productName) => {
    const response = await useServiceCart().addProduct(productName);
    await getItems();
    if (!response.success) handlePopup("Error", "No se pudo agregar el producto al carrito.", "error");
  };

  const decreaseProductQuantity = async (productName) => {
    const response = await useServiceCart().decreaseProductQuantity(productName);
    await getItems();
    if (!response.success) handlePopup("Error", "No se pudo disminuir la cantidad del producto.", "error");
  };

  const removeProduct = async (productName) => {
    const response = await useServiceCart().removeProduct(productName);
    await getItems();
    if (!response.success) handlePopup("Error", "No se pudo eliminar el producto del carrito.", "error");
  };

  const emptyCart = async () => {
    const response = await useServiceCart().emptyCart();
    await getItems();
    if (!response.success) handlePopup("Error", "No se pudo vaciar el carrito. Intente nuevamente.", "error");
  };

  const checkout = async () => {
    const response = await useServiceCart().checkout();
    await getItems();
    if (response.success) {
      handlePopup("Compra Exitosa", "Compra realizada exitosamente!", "success");
    } else if (!response.success && response.status != 200) {
      handlePopup("Error", "Error al realizar la compra. Intente nuevamente.", "error");
    } else {
      handlePopup("Falta de Stock", `Faltan productos en stock: ${response.products.join(', ')}`, "warning");
    }
  };


  return (
    <Container
      fluid
      className="cart-page py-5 vh-100 d-flex flex-column align-items-center"
    >
      <Row className=" justify-content-center mb-2 pt-4">
      <Col md={8} className="text-center mb-5 w-100">
        <h3
          className="fw-bold text-dark mb-4"
          style={{
            borderBottom: "2px solid #007bff",
            paddingBottom: "5px",
            fontSize: "1.5rem",
          }}
        >
          CARRITO
        </h3>
      </Col>
    </Row>
    <Row className="justify-content-center w-100 flex-grow-1">
        <Col md={8} className="d-flex flex-column align-items-center">
          {items.length === 0 ? (
            <Card className="text-center p-5 empty-cart-card w-100 bg-dark text-light align-items-center">
              <FaShoppingCart size={64} className="mb-4 text-secondary" />
              <h2>Aún no hay items en el carrito!</h2>
              <p>Agrega primero un producto para poder visualizar el carrito</p>
            </Card>
          ) : (
            <Card className="cart-items-card p-4 w-100 bg-dark">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="cart-item mb-4 p-3"
                  style={{ borderBottom: "1px solid #555" }}
                >
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Col>
                    <Col xs={5}>
                      <h5 style={{ fontWeight: "bold", color: "#ccc" }}>
                        {item.name}
                      </h5>
                      <span
                        xs={1}
                        className="text-end"
                        style={{ color: "#ccc", fontWeight: "bold" }}
                      >
                        ${item.price}
                      </span>
                    </Col>
                    <Col xs={3} className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        onClick={() => decreaseProductQuantity(item.name)}
                      >
                        -
                      </Button>
                      <span
                        className="mx-2"
                        style={{ fontWeight: "bold", color: "#ccc" }}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => addProduct(item.name)}
                      >
                        +
                      </Button>
                    </Col>

                    <Col xs={1} className="text-end">
                      <Button
                        variant="link"
                        onClick={() => removeProduct(item.name)}
                      >
                        <FaTrash size={18} style={{ color: "#ccc" }} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              {items.length > 0 && (
                <Button
                  variant="danger"
                  className="empty-cart-btn"
                  onClick={() => emptyCart()}
                >
                  <FaTrash size={16} />
                </Button>
              )}
            </Card>
          )}
        </Col>

        <Col
          md={4}
          className="order-summary d-flex flex-column align-items-center"
        >
          <div className="p-4 w-100 bg-dark order-summary order-card">
            <h5>RESUMEN DE PEDIDO</h5>
            <hr />
            {items.map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between product-item"
              >
                <span>{item.quantity}x</span>
                <span>{item.name}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between total-section">
              <span>
                <strong>TOTAL:</strong>
              </span>
              <span>${total}</span>
            </div>
            <Button
              variant="primary"
              className="mt-4 w-100"
              disabled={items.length === 0}
              onClick={checkout}
            >
              COMPRAR
            </Button>
          </div>
        </Col>
      </Row>
      <ErrorPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupTitle}
        message={popupMessage}
        severity={popupSeverity}
      />
    </Container>
  );
}

export default Cart;
