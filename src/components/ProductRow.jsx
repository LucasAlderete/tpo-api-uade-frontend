import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteProductById } from '../services/serviceProducts';


const ProductRow = ({ product, onProductDeleted }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();  

  const totalStock = product?.stock?.length > 0
    ? product?.stock?.reduce((acc, stock) => acc + parseInt(stock.stock, 10), 0)
    : 'Sin stock';

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteProduct = async () => {
    try {
      await deleteProductById(product.id);
      setShowModal(false);
      onProductDeleted();
    } catch (error) {
      console.error('No se pudo eliminar el producto:', error);
    }
  };

  const handleEditProduct = () => {
    navigate(`/add-product?productId=${product.id}`); 
  };

  return (
    <>
      <tr>
        {/* <td>
            {product.url_image_list.map((image, index) => (
                <img
                    key={index}
                    src={image.path}
                    alt={`${product.name} - ${index + 1}`}
                    width="50"
                    height="50"
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
            ))}
        </td> */}
        <td>{product.name}</td>
        <td>{product.category_name}</td>
        <td>{product.description}</td>
        <td>${product.price}</td>
        <td>{totalStock}</td>
        <td>
          <Button variant="outline-primary" className="me-2" onClick={handleEditProduct}><FaEdit /></Button> 
          <Button variant="outline-danger" onClick={handleShowModal}><FaTrash /></Button>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>  ¿Estás seguro de que deseas eliminar el producto{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{product.name}</span>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ProductRow.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired, 
        category_name: PropTypes.string.isRequired, 
        description: PropTypes.string.isRequired, 
        price: PropTypes.number.isRequired, 
        stock: PropTypes.number.isRequired,
        images: PropTypes.array,
        additional_information: PropTypes.string.isRequired,
        url_image_list: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onProductDeleted: PropTypes.func.isRequired,
};

export default ProductRow;