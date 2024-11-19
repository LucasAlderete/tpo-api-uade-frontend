import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"

const Register = () => {

  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    name: "",
    surname: "",
    role: "USER"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.birthday) newErrors.birthday = "Birthday is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.surname) newErrors.surname = "Surname is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData.username, formData.email, formData.password, formData.birthday, formData.name, formData.surname, formData.role);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <small className="text-danger">{errors.username}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          {errors.birthday && <small className="text-danger">{errors.birthday}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          {errors.surname && <small className="text-danger">{errors.surname}</small>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  );
};
  
  export default Register;