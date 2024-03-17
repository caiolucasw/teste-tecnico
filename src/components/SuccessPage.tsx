import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3 lg:min-w-[600px]">
      <div className="flex justify-end mb-4">
        <button
          className="rounded-md text-white text-sm bg-black p-2 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => navigate("/")}
        >
          Fazer novo pedido
        </button>
      </div>
      <div
        className="bg-teal-100 border-t-4 lg:w-full border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Seu pedido foi concluído com sucesso!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
