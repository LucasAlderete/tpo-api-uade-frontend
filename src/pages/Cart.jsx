import React, { useState, useEffect } from "react";
import cartService from "../services/serviceCart";
import ErrorPopup from "../components/ErrorPopup";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

function Cart({ userId = 1, productId = 1 }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("info");

  useEffect(() => {
    const cartData = {
      items: [
        { id: 1, name: "Laptop", price: 10500, quantity: 2, stock: 150, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Mouse", price: 5000, quantity: 1, stock: 2, image: "https://via.placeholder.com/150" }
      ],
      total: 15500
    };
    setItems(cartData.items);
    setTotal(cartData.total);
  }, []);

  const handlePopup = (title, message, severity) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupSeverity(severity);
    setPopupOpen(true);
  };

  const updateQuantity = (productId, quantity) => {
    setItems(prevItems => {
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const addProduct = (productId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            handlePopup("Error", "No hay suficiente stock disponible.", "error");
            return item;
          }
        }
        return item;
      });
    });

    setTotal(prevTotal => prevTotal + items.find(item => item.id === productId).price);
  };

  const decreaseProductQuantity = (productId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });


    if ((prevTotal => prevTotal - items.find(item => item.id === productId).price) >= 0) {
      setTotal(prevTotal => prevTotal - items.find(item => item.id === productId).price);
    }
  };

  const removeProduct = (productId) => {
    setItems(items.filter(item => item.id !== productId));  
    setTotal(total - (items.find(item => item.id === productId).price * items.find(item => item.id === productId).quantity));  
  };
  

  const emptyCart = () => {
    setItems([]);
    setTotal(0);
  };

  const handleCheckout = () => {
    const outOfStockItems = items.filter(item => item.quantity > item.stock);
    if (outOfStockItems.length > 0) {
      handlePopup("Falta de Stock", `Faltan productos en stock: ${outOfStockItems.map(item => item.name).join(', ')}`, "warning");
    } else {
      const response = { success: true, products: [] };
      handlePopup("Compra Exitosa", "Compra realizada exitosamente!", "success");
      emptyCart();  
      setTotal(0);
    }
  };

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const cartData = await cartService.getCart(userId);
  //       setItems(cartData.items);
  //       setTotal(cartData.total);
  //     } catch (error) {
  //       handlePopup(
  //         "Error",
  //         "Error al cargar el carrito. Intente nuevamente.",
  //         "error"
  //       );
  //     }
  //   };
  //   fetchCart();
  // }, [userId]);

  // const handlePopup = (title, message, severity) => {
  //   setPopupTitle(title);
  //   setPopupMessage(message);
  //   setPopupSeverity(severity);
  //   setPopupOpen(true);
  // };

  // const addProduct = async (productId) => {
  //   try {
  //     await cartService.addProduct(userId, productId);
  //     await refreshCart();
  //   } catch (error) {
  //     console.log(error)
  //     handlePopup("Error", "No se pudo agregar el producto al carrito.", "error");
  //   }
  // };

  // const decreaseProductQuantity = async (productId) => {
  //   try {
  //     await cartService.decreaseProductQuantity(userId, productId);
  //     await refreshCart();
  //   } catch (error) {
  //     handlePopup("Error", "No se pudo disminuir la cantidad del producto.", "error");
  //   }
  // };

  // const removeProduct = async (productId) => {
  //   try {
  //     await cartService.removeProduct(userId, productId);
  //     await refreshCart();
  //   } catch (error) {
  //     handlePopup("Error", "No se pudo eliminar el producto del carrito.", "error");
  //   }
  // };

  // const emptyCart = async () => {
  //   try {
  //     await cartService.emptyCart(userId);
  //     setItems([]);
  //     await refreshCart();
  //   } catch (error) {
  //     handlePopup("Error", "No se pudo vaciar el carrito. Intente nuevamente.", "error");
  //   }
  // };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await cartService.checkout(userId);
  //     if (response.success) {
  //       handlePopup("Compra Exitosa", "Compra realizada exitosamente!", "success");
  //       setItems([]);
  //     } else {
  //       handlePopup("Falta de Stock", `Faltan productos en stock: ${response.products.join(', ')}`, "warning");
  //     }
  //   } catch (error) {
  //     handlePopup("Error", "Error al realizar la compra. Intente nuevamente.", "error");
  //   }
  // };

  const refreshCart = async () => {
    const cartData = await cartService.getCart(userId);
    setItems(cartData.items);
    setTotal(cartData.total);
  };

  return (
    <Container
      fluid
      className="cart-page py-5 vh-100 d-flex align-items-center"
    >
      <Row className="justify-content-center w-100">
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
                        style={{ maxWidth: "100%" }}
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
                        onClick={() => decreaseProductQuantity(item.id)}
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
                        onClick={() => addProduct(item.id)}
                      >
                        +
                      </Button>
                    </Col>

                    <Col xs={1} className="text-end">
                      <Button variant="link" onClick={() => removeProduct(item.id)}>
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
          <div className="p-4 w-100 bg-dark order-summary">
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
              onClick={handleCheckout}
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