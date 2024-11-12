import React, { useState, useEffect } from "react";
import cartService from "../services/serviceCart";
import AlertMessage from "../components/CheckoutAlert";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

function Cart() {
  return (
    <Container fluid className="cart-page py-5 vh-100 d-flex align-items-center">
        <Row className="justify-content-center w-100">
            <Col md={8} className="d-flex flex-column align-items-center">
           {items.length === 0 ? (
            <Card className="text-center p-5 empty-cart-card w-100">
              <FaShoppingCart size={64} className="mb-4" />
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
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                      <span className="mx-2" style={{ fontWeight: 'bold', color: '#ccc' }}>{item.quantity}</span>
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                    </Col>
                    
                    <Col xs={1} className="text-end">
                      <Button variant="link" onClick={() => updateQuantity(item.id, -item.quantity)}>
                        <FaTrash size={18} style={{ color: '#ccc' }} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              {items.length > 0 && (
                    <Button variant="danger" className="empty-cart-btn" >
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
              {/* <span>${total}</span> */}
            </div>
            <Button
              variant="primary"
              className="mt-4 w-100"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              COMPRAR
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};



export default Cart;
