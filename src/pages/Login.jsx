import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

const Login = () => {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Direccion de email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
            <p className="mt-3 text-center">
                Todavia no tenes cuenta? <Link to="/register">Registrate!</Link>
            </p>
        </div>
      );
    };
  
export default Login;