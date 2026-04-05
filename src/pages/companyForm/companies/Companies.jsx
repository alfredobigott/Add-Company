import React, { useState } from "react";

const Companies = () => {
  const [companies, setCompanies] = useState(() => {
    const storedData = localStorage.getItem("companyData");
    return storedData ? JSON.parse(storedData) : [];
  });
  console.log(companies, "companies in Companies.jsx");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-slate-800">Customers</h2>
      </div>
    </div>
  );
};

export default Companies;
