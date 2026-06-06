import React, { useState, useEffect } from "react";
import { CardCompany } from "../../../components/CardCompany";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("companyData");
    setCompanies(storedData ? JSON.parse(storedData) : []);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Clients</h2>

        {companies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-slate-500">No clients yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <CardCompany key={index} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
