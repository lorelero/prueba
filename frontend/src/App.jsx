import { Routes, Route } from "react-router-dom";

// importar vistas
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CustomNavbar from "./components/Navbar";
import Account from "./pages/Account";
import Tienda from "./pages/Tienda";
import Carrito from "./pages/Carrito";
import CerrarSesion from "./components/CerrarSesion";
import CategorySacos from "./pages/CategorySacos";

const App = () => {
  return (
    <>
      <CustomNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/admin/*" element={<AdminDashboard />} />{" "}
          {/* Notar el "/*"  en la ruta permite que React Router maneje subrutas dentro de AdminDashboard.*/}
          <Route path="/user/*" element={<UserDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sacos" element={<CategorySacos />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/cart" element={<Carrito />} />
          <Route path="/cerrarsesion" element={<CerrarSesion />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
