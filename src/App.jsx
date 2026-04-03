import { Routes, Route, Link, useLocation } from "react-router-dom";
import CompanyForm from "./pages/companyForm/CompanyForm";
import Companies from "./pages/companyForm/companies/Companies";

// Componente de navegación
function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex gap-8">
        <Link
          to="/"
          className={`font-bold text-lg transition-colors cursor-pointer ${
            location.pathname === "/"
              ? "text-lime-400 border-b-2 border-lime-400"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Form
        </Link>
        <Link
          to="/customers"
          className={`font-bold text-lg transition-colors cursor-pointer ${
            location.pathname === "/customers"
              ? "text-lime-400 border-b-2 border-lime-400"
              : "text-slate-300 hover:text-white"
          }`}
        >
          Customers
        </Link>
      </div>
    </nav>
  );
}

// App principal
function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<CompanyForm />} />
        <Route path="/customers" element={<Companies />} />
      </Routes>
    </>
  );
}

export default App;
