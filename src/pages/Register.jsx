import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    name: "",
    surname: ""
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
      // Perform registration logic here (e.g., send formData to backend)
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
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
          <label htmlFor="password" className="form-label">Password</label>
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
          <label htmlFor="birthday" className="form-label">Birthday</label>
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
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="surname" className="form-label">Surname</label>
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

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};
  
  export default Register;