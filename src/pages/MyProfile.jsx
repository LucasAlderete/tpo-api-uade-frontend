import { useEffect, useState, useContext } from 'react';
import serviceMyProfile from '../services/serviceMyProfile';
import ProfileCard from '../components/ProfileCard';
import { AuthContext } from "../context/AuthContext";
import {getTodosProductos} from '../services/serviceProducts'

const MyProfile = () => {
  const [orders, setOrders] = useState([])
  const { isAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData && isAuthenticated() ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodosProductos();
        setData(data);
        console.log("aaaaaaaaaaaaa", data.find(producto => producto.id == 1).name)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);
  

  // Obtengo usuario
  useEffect(() => {
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

    window.addEventListener("userDataChanged", handleUserDataChange);

    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const data = await serviceMyProfile.ordersById();
        //console.log(await serviceMyProfile.ProductIdList());
        setOrders(data);
        //console.log(data)
      } catch (error) {
        console.error("ERROR: Error al cargar el perfil del usuario. Intente nuevamente.", error);
      }
    };
    fetchMyProfile();
  }, []);

  return (

    <div className="container mt-5">
      <h3>Mi Perfil</h3>
      <ProfileCard profile={userData} />
      
      <h3>Checkouts</h3>
      {(orders && orders.length === 0)
      ?"Todavia no se cargaron ordenes"
      : <div className="accordion" id="accordionCheckouts">
        {orders.map((orders) => (
          <div className="accordion-item" key={orders.id}>
            <h2 className="accordion-header" id={`heading-${orders.id}`}>
              <button
                className="accordion-button-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${orders.id}`}
                aria-expanded="true"
                aria-controls={`collapse-${orders.id}`}
              >
                #{orders.id}
              </button>
            </h2>
            <div
              id={`collapse-${orders.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${orders.id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                 {/* Información de la orden */}
            
                <p><strong>Fecha:</strong> {orders.date}</p>
                <p><strong>Precio Final:</strong> ${orders.total}</p>

                 {/*Tabla de items*/}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.order_items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <th scope="row">{itemIndex + 1}</th>
                        <td>{data.find(producto => producto.id == item.product_id).name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>}
      
    </div>
  );
}

export default MyProfile;