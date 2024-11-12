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
            <Card className="cart-items-card p-4">
                 {items.length > 0 && (
                <Button variant="danger" className="empty-cart-btn" >
                  <FaTrash size={16} />
                </Button>
              )}
              {items.map((item, index) => (
                <Row key={index} className="align-items-center mt-4">
                  <Col xs={3}>
                    <img src={item.image} alt={item.name} className="img-fluid" />
                  </Col>
                  <Col xs={5}>
                  <h5 style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</h5>
                  <p style={{ color: '#555' }}>${item.price} x {item.quantity}</p>
                </Col>
                  <Col xs={4} className="d-flex justify-content-end align-items-center">
                    <Button variant="outline-secondary" onClick={() => onDecreaseQuantity(item.id)}>-</Button>
                    <span className="mx-4" style={{ fontWeight: 'bold', color: '#333' }}>{item.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => onIncreaseQuantity(item.id)}>+</Button>
                  </Col>
                </Row>
              ))}
            </Card>
          )}
        </Col>


        <Col md={4} className="order-summary d-flex flex-column align-items-center">
          <Card className="p-4 w-100">
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
      
              disabled={items.length === 0}
            >
              COMPRAR
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};



export default Cart;
