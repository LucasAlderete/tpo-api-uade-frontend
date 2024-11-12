import React from 'react';

const MyProfile = ({ username, email, birthday, name, surname }) => {
  return (
    <div className="container mt-5">

      {/*Datos*/}

      <h3>My Perfil</h3>
      <div className="card mb-5">
        <div className="card-body">
          <p className="card-text">
            <strong>Nombre:</strong> {name} {surname}
          </p>
          <p className="card-text">
            <strong>Usuario:</strong> {username}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {email}
          </p>
          <p className="card-text">
            <strong>Fecha de nacimiento:</strong> {birthday}
          </p>
          <p className="card-text">
            <strong>Nombre:</strong> {name}
          </p>
          <p className="card-text">
            <strong>Apellido:</strong> {surname}
          </p>
        </div>
      </div>

      {/*Checkouts*/}

      <h3>Checkouts</h3>
      <div className="accordion" id="accordionExample">
        {checkouts.map((checkout, index) => (
          <div className="accordion-item" key={checkout.id}>
            <h2 className="accordion-header" id={`heading-${checkout.id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${checkout.id}`}
                aria-expanded="true"
                aria-controls={`collapse-${checkout.id}`}
              >
                #{checkout.id}
              </button>
            </h2>
            <div
              id={`collapse-${checkout.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${checkout.id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {/* Información de la orden */}
                <p><strong>Fecha:</strong> {checkout.date}</p>
                <p><strong>Precio total:</strong> ${checkout.total}</p>

                {/* Tabla de items */}
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
                    {checkout.items.map((item, itemIndex) => (
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