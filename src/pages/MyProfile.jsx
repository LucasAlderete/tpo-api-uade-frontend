import { useEffect, useState, useContext } from 'react';
import { getUserWithOrders } from '../services/serviceMyProfile';
import ProfileCard from '../components/ProfileCard';
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState(null)
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData && isAuthenticated() ? JSON.parse(storedData) : null;
  });
  const [userWithOrders, setUserWithOrders] = useState(null)

  // settear usuario con ordenes
  useEffect(() => {
    const fetchUserWithOrders = async () => {
      try {
        const userWithOrders = await getUserWithOrders();
        setUserWithOrders(userWithOrders);
        setOrders(userWithOrders.orders_dto)
        console.log(userWithOrders)
      } catch (e) {
        setOrders(false)
        console.error("Error: ", e);
      }
    };
    fetchUserWithOrders();
  }, []);
  
  // settear usuario
  useEffect(() => {
    const handleUserDataChange = (event) => {
      setUserData(event.detail);
    };

    window.addEventListener("userDataChanged", handleUserDataChange);

    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

  return (

    <div className="container mt-5">
      <h3>Mi Perfil</h3>
      <ProfileCard profile={userData} />
      
      <h3>Checkouts</h3>
      {(orders == null)
      ?"Cargando..."
      :(orders.length === 0)
      ?"No tiene ninguna orden cargada."
      :(orders == false)
      ?"No se pudieron cargar tus ordenes. Por favor intentelo más tarde."
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
            
                <p><strong>Fecha:</strong> {`${orders.date[0]}/${orders.date[1]}/${orders.date[2]} ${orders.date[3]}:${orders.date[4]}:${orders.date[5]}`}</p>
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
                    {orders.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <th scope="row">{itemIndex + 1}</th>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
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