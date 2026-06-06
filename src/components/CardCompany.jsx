export const CardCompany = ({ company }) => {
  if (!company) return null;

  const bankNames = company.banks.map((bank) => bank.name);

  return (
    <div className="bg-slate-50 rounded-lg p-6 shadow-md flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="h-12 w-12 inline-flex justify-center items-center shrink-0 rounded-full bg-sky-500 text-white font-bold">
          {company.company.charAt(0)}
        </span>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{company.company}</h3>
          <p className="text-gray-500">{company.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span>📍</span>
        <div>
          <p className="font-medium">{company.address1}</p>
          <p className="text-gray-500">CP: {company.zipCode}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-500">Bancos asociados</p>
        <div className="flex items-center gap-4 mt-2">
          {bankNames.map((bank) => (
            <p key={bank} className="text-gray-500">
              {bank}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
