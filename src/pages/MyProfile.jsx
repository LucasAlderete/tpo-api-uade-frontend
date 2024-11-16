import React, { useEffect, useState } from 'react';
import myProfileService from '../services/serviceMyProfile';

const MyProfile = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const myProfileData = await myProfileService.getMyProfile();
        setUsername(myProfileData.username)
        setEmail(myProfileData.email)
        setBirthday(myProfileData.birthday)
        setName(myProfileData.name)
        setSurname(myProfileData.surname)
        setOrders(myProfileData.ordersDto)
      } catch (error) {
        // handlePopup("Error", "Error al cargar el perfil del usuario. Intente nuevamente.", "error");
      }
    };
    fetchMyProfile();
  }, []);

  return (

    <div className="container mt-5">

      {/*Datos*/}

      <h3>My Profile</h3>
      <div className="card mb-5">
        <div className="card-body">
          <p className="card-text">
            <strong>Name:</strong> {name}
          </p>
          <p className="card-text">
            <strong>Surname:</strong> {surname}
          </p>
          <p className="card-text">
            <strong>Username:</strong> {username}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
          <p className="card-text">
            <strong>Birthday:</strong> {birthday}
          </p>
          
        </div>
      </div>

      {/*Checkouts*/}

      <h3>Checkouts</h3>
      
      <div className="accordion" id="accordionCheckouts">
        {orders.map((orders, index) => (
          <div className="accordion-item" key={orders.id}>
            <h2 className="accordion-header" id={`heading-${orders.id}`}>
              <button
                className="accordion-button"
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
      </div>

    </div>
  );
}

export default MyProfile;