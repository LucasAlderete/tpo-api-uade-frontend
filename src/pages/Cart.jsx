import React, { useState, useEffect } from "react";
import cartService from "../services/serviceCart";
import CheckoutPopup from "../components/CheckoutPopup";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

function Cart({ userId=1 }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartService.getCart(userId);
        setItems(cartData.items);
        setTotal(cartData.total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const addProduct = async (productId) => {
    await cartService.addProduct(userId, productId);
    await refreshCart();
  };

  const decreaseProductQuantity = async (productId) => {
    await cartService.decreaseProductQuantity(userId, productId);
    await refreshCart();
  };

  const removeProduct = async (productId) => {
    await cartService.removeProduct(userId, productId);
    await refreshCart();
  };

  const emptyCart = async () => {
    await cartService.emptyCart(userId);
    setItems([]);
  };

  const handleCheckout = async () => {
    try {
      const response = await cartService.checkout(userId);
      if (response.success) {
        setCheckoutMessage("Compra realizada exitosamente!");
        setItems([]); 
      } else {
        setCheckoutMessage(`Faltan productos en stock: ${response.products.join(', ')}`);
      }
    } catch (error) {
      setCheckoutMessage("Error al realizar la compra. Intente nuevamente.");
      console.error("Error durante el checkout:", error);
    }
    setPopupOpen(true);
  };

  const handleClose = () => setPopupOpen(false);

  const refreshCart = async () => {
    const cartData = await cartService.getCart(userId);
    setItems(cartData.items);
    setTotal(cartData.total);
  };
  

  return (
    <Container fluid className="cart-page py-5 vh-100 d-flex align-items-center">
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
                <div key={index} className="cart-item mb-4 p-3" style={{ borderBottom: '1px solid #555' }}>
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <img src={item.image} alt={item.name} className="img-fluid" style={{ maxWidth: '100%' }} />
                    </Col>
                    <Col xs={5}>
                      <h5 style={{ fontWeight: 'bold', color: '#ccc' }}>{item.name}</h5>
                      <span xs={1} className="text-end" style={{ color: '#ccc', fontWeight: 'bold' }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </Col>
                    <Col xs={3} className="d-flex align-items-center">
                      <Button variant="outline-secondary" onClick={() => decreaseProductQuantity(item.id)}>-</Button>
                      <span className="mx-2" style={{ fontWeight: 'bold', color: '#ccc' }}>{item.quantity}</span>
                      <Button variant="outline-secondary" onClick={() => addProduct(item.id)}>+</Button>
                    </Col>
                    
                    <Col xs={1} className="text-end">
                      <Button variant="link" onClick={() => removeProduct() }>
                        <FaTrash size={18} style={{ color: '#ccc' }} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              {items.length > 0 && (
                    <Button variant="danger" className="empty-cart-btn" onClick={() => emptyCart()}>
                      <FaTrash size={16} />
                    </Button>
              )}
            </Card>
          )}
        </Col>


        <Col md={4} className="order-summary d-flex flex-column align-items-center">
          <div className="p-4 w-100 bg-dark order-summary">
            <h5>RESUMEN DE PEDIDO</h5>
            <hr />
            {items.map((item, index) => (
              <div key={index} className="d-flex justify-content-between product-item">
                <span>{item.quantity}x</span>
                <span>{item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between total-section">
              <span><strong>TOTAL:</strong></span>
              <span>${total}</span>
            </div>
            <Button
              variant="primary"
              className="mt-4 w-100"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              COMPRAR
            </Button>
            <CheckoutPopup open={popupOpen} onClose={handleClose} message={checkoutMessage} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};



export default Cart;
