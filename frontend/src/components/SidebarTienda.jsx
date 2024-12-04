import { Form } from "react-bootstrap";
import { useState } from "react";

const SidebarTienda = () => {
  
  const [filtros, setFiltros] = useState({
    categorias: [],
    marcas: [],
    descuentos: [],
    precios: [],
  });

  const handleCheckboxChange = (category, value) => {
    setFiltros((prev) => {
      const current = prev[category];
      const newFilters = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return { ...prev, [category]: newFilters };
    });
  };

  return (
    <div className="bg-white text-dark vh-100 p-3">
      <h2>Filtros</h2>

      <ul>
        <li style={{ marginTop: "2rem" }}>
          <h4>Categorías</h4>
          {["Carpas", "Mochilas", "Sacos & Colchonetas", "Accesorios"].map(
            (categoria) => (
              <li key={categoria}>
                <Form.Check
                  type="checkbox"
                  id={`categoria-${categoria}`}
                  label={categoria}
                  onChange={() => handleCheckboxChange("categorias", categoria)}
                />
              </li>
            )
          )}
        </li>

        <li style={{ marginTop: "2rem" }}>
          <h4>Marcas</h4>
          {["Doite", "Kano", "Lippi", "Thermarest"].map((marca) => (
            <li key={marca}>
              <Form.Check
                type="checkbox"
                id={`marca-${marca}`}
                label={marca}
                onChange={() => handleCheckboxChange("marcas", marca)}
              />
            </li>
          ))}
        </li>

        <li style={{ marginTop: "2rem" }}>
          <h4>Descuentos</h4>
          {[
            "20% dcto y más",
            "30% dcto y más",
            "40% dcto y más",
            "50% dcto y más",
          ].map((descuento) => (
            <li key={descuento}>
              <Form.Check
                type="checkbox"
                id={`descuento-${descuento}`}
                label={descuento}
                onChange={() => handleCheckboxChange("descuentos", descuento)}
              />
            </li>
          ))}
        </li>

        <li style={{ marginTop: "2rem", fontSize: "13px" }}>
          <h4>Precio</h4>
          {[
            "$10.000 - $50.000",
            "$60.000 - $120.000",
            "$130.000 - $220.000",
            "$230.000 - $320.000",
          ].map((precio) => (
            <li key={precio}>
              <Form.Check
                type="checkbox"
                id={`precio-${precio}`}
                label={precio}
                onChange={() => handleCheckboxChange("precios", precio)}
              />
            </li>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default SidebarTienda;
