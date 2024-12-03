import { Nav } from "react-bootstrap"; // Importar Nav para manejar la navegación
import { LinkContainer } from "react-router-bootstrap"; // Para integrar react-router con Bootstrap Nav
import '../App.css'; // Importar el archivo CSS

const SidebarAdmin = () => {
  return (
    <div className="bg-white text-dark vh-100">
      <h4 className="text-center mb-4">Menú</h4> 
      <Nav className="flex-column"> 
       
        <LinkContainer to="/admin/datos-personales">
       <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Datos Personales</Nav.Link> 
       </LinkContainer>

       
        <LinkContainer to="/admin/mis-ventas">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Mis Ventas</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/mis-publicaciones">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Mis Publicaciones</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cerrarsesion">
          <Nav.Link className="btn btn-outline-warning mb-2 btn-sidebar">Cerrar Sesión</Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;
