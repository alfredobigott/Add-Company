export const CardCompany = () => {
  return (
    <div className="bg-slate-50 rounded-lg p-6 shadow-md flex flex-col gap-6 .">
      <div className="flex items-center gap-4">
        <span className="h-12 w-12 inline-flex justify-center items-center shrink-0 rounded-full bg-sky-500">
          G
        </span>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">Google</h3>
          <p className="text-gray-500">go@yopmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span>📍</span>
        <div>
          <p className="font-medium">Jacarandá</p>
          <p className="text-gray-500">Calle 4</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-500">Bancos asociados</p>
        <div className="flex items-center gap-4 mt-2">
          <p className="text-gray-500">BBVA</p>
          <p className="text-gray-500">Santander</p>
          <p className="text-gray-500">Galicia</p>
        </div>
      </div>
    </div>
  );
};
