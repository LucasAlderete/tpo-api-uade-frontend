import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
)