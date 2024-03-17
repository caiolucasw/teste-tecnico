const ErrorAlert = () => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Houve um erro!</strong>
      <span className="block sm:inline">
        &nbsp;Seu pedido não pôde ser concluído.
      </span>
    </div>
  );
};

export default ErrorAlert;
