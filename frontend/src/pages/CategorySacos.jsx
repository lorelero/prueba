import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarTienda from "../components/SidebarTienda";

const CategorySacos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = "http://localhost:3000/productos"; // Cambia esto si es necesario

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(URL);
        // Filtrar solo los productos de la categoría "Sacos"
        const sacos = response.data.filter(
          (producto) => producto.categoria_nombre === "Sacos"
        );

        setProductos(sacos);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Hubo un problema al cargar los productos. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []); // Asegúrate de que el efecto solo se ejecute una vez

  const agregarAlCarrito = (producto) => {
    // Obtener el carrito actual del localStorage
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Agregar el producto al carrito
    const nuevoCarrito = [...carritoActual, producto];
  
    // Guarda el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  
    console.log("Producto añadido al carrito:", producto);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <>
      <h1>Categoría: Sacos</h1>
      <Container className="mt-5 fluid">
        <Row>
          <Col md={3} lg={3} className="mb-4">
            {/* Sidebar en el lado izquierdo */}
            <SidebarTienda />
          </Col>

          <Col md={9}>
            <Row lg={3} md={3} sm={12}>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <Col key={producto.id_producto} className="mb-3">
                    <Card
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link to={`/detalle/${producto.id_producto}`}>
                        <Card.Img
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100px",
                            margin: "0px",
                          }}
                          src={producto.imagen_url}
                          alt={producto.producto_nombre}
                        />
                      </Link>
                      <Card.Body
                        style={{
                          padding: "10px",
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {producto.sale === "activo" && (
                          <h6 style={{ marginTop: "5px" }}>
                            <Badge bg="danger">SALE</Badge>
                          </h6>
                        )}
                        <Card.Text style={{ margin: "5px 0", fontSize: "12px" }}>
                          {producto.categoria_nombre}
                        </Card.Text>
                        <Card.Title style={{ fontSize: "18px" }}>
                          {producto.producto_nombre}
                        </Card.Title>
                        <Card.Text style={{ margin: "5px 0" }}>
                          ${producto.producto_precio}
                        </Card.Text>

                        <Button
                          style={{
                            width: "100%",
                            margin: "0 auto",
                            whiteSpace: "nowrap",
                            fontSize: "14px",
                          }}
                          variant="warning"
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          Agregar al Carrito
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No hay productos disponibles en esta categoría.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategorySacos;
