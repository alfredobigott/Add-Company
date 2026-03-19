import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    company: "",
    address1: "",
    zipCode: "",
    email: "",
  });

  const [banks, setBanks] = useState([
    { id: 1, name: "Santander", checked: false },
    { id: 2, name: "BBVA", checked: false },
    { id: 3, name: "Galicia", checked: false },
    { id: 4, name: "Nación", checked: false },
    { id: 5, name: "Macro", checked: false },
  ]);

  const [errors, setErrors] = useState({});
  const [renderedList, setRenderedList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBankChange = (id) => {
    const updatedBanks = banks.map((bank) => {
      if (bank.id === id) {
        const updatedBank = { ...bank, checked: !bank.checked };
        if (!updatedBank.checked) {
          setRenderedList(renderedList.filter((item) => item !== bank.name));
        }
        return updatedBank;
      }
      return bank;
    });
    setBanks(updatedBanks);
    if (errors.banks) setErrors((prev) => ({ ...prev, banks: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (formData.company.length < 2)
      newErrors.company = "Nombre demasiado corto.";
    if (formData.address1.length < 2)
      newErrors.address1 = "Dirección requerida.";
    if (formData.zipCode.length < 1) newErrors.zipCode = "CP requerido.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Email inválido.";

    const selectedBanks = banks.filter((b) => b.checked).map((b) => b.name);
    if (selectedBanks.length === 0) newErrors.banks = "Elige al menos 1 banco.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setRenderedList(selectedBanks);
  };

  const clearForm = () => {
    setFormData({ company: "", address1: "", zipCode: "", email: "" });
    setBanks(banks.map((b) => ({ ...b, checked: false })));
    setErrors({});
    setRenderedList([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="p-8 md:p-12 md:w-1/2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Bank Setup</h2>
            <button
              onClick={clearForm}
              className="text-slate-500 underline text-sm hover:text-slate-800"
            >
              Clear All
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Empresa */}
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md outline-none transition-all font-bold ${errors.company ? "border-red-500" : "border-slate-300 focus:border-lime-500"}`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md outline-none transition-all font-bold ${errors.email ? "border-red-500" : "border-slate-300 focus:border-lime-500"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Dirección y CP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-2 text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md outline-none transition-all font-bold ${errors.address1 ? "border-red-500" : "border-slate-300 focus:border-lime-500"}`}
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-2 text-sm font-medium">
                  Zip Code
                </label>
                <input
                  type="number"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md outline-none transition-all font-bold ${errors.zipCode ? "border-red-500" : "border-slate-300 focus:border-lime-500"}`}
                />
              </div>
            </div>

            {/* Bancos (Estilo Checkbox de la imagen) */}
            <div>
              <label className="block text-slate-600 mb-2 text-sm font-medium">
                Select Banks
              </label>
              <div className="space-y-2">
                {banks.map((bank) => (
                  <label
                    key={bank.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${bank.checked ? "bg-lime-50 border-lime-500" : "border-slate-300 hover:border-lime-500"}`}
                  >
                    <input
                      type="checkbox"
                      checked={bank.checked}
                      onChange={() => handleBankChange(bank.id)}
                      className="w-4 h-4 accent-lime-500"
                    />
                    <span className="ml-3 font-bold text-slate-800 text-sm">
                      {bank.name}
                    </span>
                  </label>
                ))}
              </div>
              {errors.banks && (
                <p className="text-red-500 text-xs mt-1">{errors.banks}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold py-4 px-10 rounded-full transition-transform active:scale-95 shadow-lg"
            >
              <span className="text-xl">📊</span> Confirm Selection
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: RESULTADOS */}
        <div className="bg-slate-900 p-8 md:p-12 md:w-1/2 flex flex-col items-center justify-center text-center md:rounded-bl-[80px]">
          {renderedList.length === 0 ? (
            <>
              <div className="bg-slate-800 p-6 rounded-full mb-6">
                <span className="text-5xl">🏦</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-4">
                No banks selected
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Fill out the form and select your banks to see the generated
                list here.
              </p>
            </>
          ) : (
            <div className="w-full text-left">
              <h3 className="text-white text-2xl font-bold mb-2">
                Your Selection
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                Review the companies and banks below:
              </p>
              <div className="bg-slate-800/50 border-t-4 border-lime-400 p-6 rounded-xl">
                <p className="text-lime-400 text-xs uppercase tracking-widest font-bold mb-1">
                  Company
                </p>
                <p className="text-white text-xl font-bold mb-4">
                  {formData.company}
                </p>

                <p className="text-lime-400 text-xs uppercase tracking-widest font-bold mb-1">
                  Active Banks
                </p>
                <ul className="space-y-2">
                  {renderedList.map((item) => (
                    <li
                      key={item}
                      className="text-white flex items-center gap-2"
                    >
                      <span className="text-lime-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
