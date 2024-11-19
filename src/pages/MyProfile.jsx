import { useEffect, useState, useContext } from 'react';
import myProfileService from '../services/serviceMyProfile';
import ProfileCard from '../components/ProfileCard';
import { AuthContext } from "../context/AuthContext";


const MyProfile = () => {
  const [orders, setOrders] = useState([])
  const { isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData && isAuthenticated() ? JSON.parse(storedData) : null;
  });

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
        const data = await myProfileService.ordersById();
        myProfileService.productNameById();
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
      <h3>My Profile</h3>
      <ProfileCard profile={userData} />
      
      <h3>Checkouts</h3>
      {!orders? "Todavia no se cargaron ordenes": <div className="accordion" id="accordionCheckouts">
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
            
                <p><strong>Date:</strong> {orders.date}</p>
                <p><strong>Final Price:</strong> ${orders.total}</p>

                 {/*Tabla de items*/}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.order_items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <th scope="row">{itemIndex + 1}</th>
                        <td>{item.product}</td>
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