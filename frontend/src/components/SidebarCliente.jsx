import { Nav } from "react-bootstrap"; // Importar Nav para manejar la navegación
import { LinkContainer } from "react-router-bootstrap"; // Para integrar react-router con Bootstrap Nav
import '../App.css'; // Importar el archivo CSS

const SidebarCliente = () => {
  return (
    <div className="bg-white text-dark vh-100">
      <h4 className="text-center mb-4">Menú</h4> 
      <Nav className="flex-column"> 
       
        <LinkContainer to="/user/datos-personales">
       <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Datos Personales</Nav.Link> 
       </LinkContainer>       
        <LinkContainer to="/user/mis-compras">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Mis Compras</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/carrito-pendiente">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Carrito Pendiente</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cerrarsesion">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Cerrar Sesión</Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default SidebarCliente;
