import React, { useState } from "react";

function App() {
  // 1. Form data state (inputs)
  const [formData, setFormData] = useState({
    company: "",
    address1: "",
    address2: "",
    zipCode: "",
    email: "",
  });

  // 2. Banks state (Array of objects for map)
  const [banks, setBanks] = useState([
    { id: 1, name: "Santander", checked: false },
    { id: 2, name: "BBVA", checked: false },
    { id: 3, name: "Galicia", checked: false },
    { id: 4, name: "Nación", checked: false },
    { id: 5, name: "Macro", checked: false },
  ]);

  // 3. States for errors and final render
  const [errors, setErrors] = useState({});
  const [renderedList, setRenderedList] = useState([]);

  // 4. Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 5. Handle checkboxes logic
  const handleBankChange = (id) => {
    const updatedBanks = banks.map((bank) => {
      if (bank.id === id) {
        const updatedBank = { ...bank, checked: !bank.checked };

        // Immediate removal if unchecked
        if (updatedBank.checked === false) {
          setRenderedList(renderedList.filter((item) => item !== bank.name));
        }
        return updatedBank;
      }
      return bank;
    });
    setBanks(updatedBanks);
  };

  // 6. Form Submission & Validation
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (formData.company.length <= 1 || formData.company.company > 60) {
      newErrors.company = "La empresa debe tener entre 2 y 60 caracteres.";
    }
    if (formData.address1.length <= 1 || formData.address1.length > 60) {
      newErrors.address1 = "La dirección 1 debe tener entre 2 y 60 caracteres.";
    }
    if (formData.zipCode.length < 1 || formData.zipCode.length > 10) {
      newErrors.zipCode = "El código postal debe tener entre 1 y 10 dígitos.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "El formato de correo no es válido.";
    }

    // Bank Validation: Check if at least one is checked
    const selectedBanks = banks
      .filter((b) => b.checked === true)
      .map((b) => b.name);

    if (selectedBanks.length === 0) {
      newErrors.banks = "Debes elegir al menos 1 banco.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success: Update the rendered list
    setRenderedList(selectedBanks);
    console.log("Form Data:", formData);
    console.log("Selected Banks:", selectedBanks);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Text Inputs */}
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
          />
          {errors.company && (
            <div style={{ color: "red" }}>{errors.company}</div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="Address 1"
          />
          {errors.address1 && (
            <div style={{ color: "red" }}>{errors.address1}</div>
          )}
        </div>

        <div>
          <input
            type="number"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
          />
          {errors.zipCode && (
            <div style={{ color: "red" }}>{errors.zipCode}</div>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        {/* Banks Checkboxes section */}
        <h3>Select Banks:</h3>
        {banks.map((bank) => (
          <div key={bank.id}>
            <input
              type="checkbox"
              checked={bank.checked}
              onChange={() => handleBankChange(bank.id)}
            />
            <label>{bank.name}</label>
          </div>
        ))}
        {errors.banks && <div style={{ color: "red" }}>{errors.banks}</div>}

        <button type="submit">Submit Form</button>
      </form>

      <hr />

      {/* Rendered List Section */}
      <h3>Rendered List:</h3>
      <ul>
        {renderedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
