import React, { useState } from "react";

function App() {
  // 1. Unificamos todos los campos en un solo objeto de estado
  const [formData, setFormData] = useState({
    empresa: "",
    direccion1: "",
    direccion2: "",
    codigoPostal: "", // Antes era 'number', ahora es parte del objeto
    email: "",
  });

  // 2. Estado para manejar los mensajes de error de cada campo
  const [errors, setErrors] = useState({});

  // 3. Función de cambio única para TODOS los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiamos el error visual apenas el usuario empiece a corregir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 4. Función de envío con validaciones manuales (sin recarga)
  const handleSubmit = (e) => {
    e.preventDefault(); // <--- Detiene la recarga de la página
    let newErrors = {};

    // Validación Manual: Empresa
    if (formData.empresa.length <= 1 || formData.empresa.length > 60) {
      newErrors.empresa = "La empresa debe tener entre 2 y 60 caracteres.";
    }

    // Validación Manual: Dirección 1
    if (formData.direccion1.length <= 1 || formData.direccion1.length > 60) {
      newErrors.direccion1 =
        "La dirección 1 debe tener entre 2 y 60 caracteres.";
    }

    // Validación Manual: Dirección 2
    if (formData.direccion2.length <= 1 || formData.direccion2.length > 60) {
      newErrors.direccion2 =
        "La dirección 2 debe tener entre 2 y 60 caracteres.";
    }

    // Validación Manual: Código Postal (1 a 10 dígitos)
    if (formData.codigoPostal.length < 1 || formData.codigoPostal.length > 10) {
      newErrors.codigoPostal =
        "El código postal debe tener entre 1 y 10 dígitos.";
    }

    // Validación Manual: Email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "El formato de correo no es válido.";
    }

    // Si el objeto de errores tiene algo, lo guardamos y no avanzamos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si pasa todas las validaciones
    console.log("¡Formulario validado y listo!", formData);
    alert("Formulario enviado con éxito (revisa la consola)");
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <div>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Nombre de Empresa"
            style={{ width: "100%" }}
          />
          {errors.empresa && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.empresa}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="direccion1"
            value={formData.direccion1}
            onChange={handleChange}
            placeholder="Dirección 1"
            style={{ width: "100%" }}
          />
          {errors.direccion1 && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.direccion1}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="direccion2"
            value={formData.direccion2}
            onChange={handleChange}
            placeholder="Dirección 2"
            style={{ width: "100%" }}
          />
          {errors.direccion2 && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.direccion2}
            </div>
          )}
        </div>

        <div>
          <input
            type="number"
            name="codigoPostal"
            value={formData.codigoPostal}
            onChange={handleChange}
            placeholder="Código Postal"
            style={{ width: "100%" }}
          />
          {errors.codigoPostal && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.codigoPostal}
            </div>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            style={{ width: "100%" }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
          )}
        </div>

        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Enviar Formulario
        </button>
      </form>
    </div>
  );
}

export default App;
