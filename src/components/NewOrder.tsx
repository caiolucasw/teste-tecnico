import { useEffect, useState } from "react";
import { Pedido, PizzaAllInfoObj } from "../types";
import OrderDetails from "./OrderDetails";
import { convertToCurrencyForm } from "../utils/utils";
import { BASE_API_URL } from "../constants";
import { criaInfoObj } from "../utils/pedidoMetodos";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

const NewOrder = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [order, setOrder] = useState<Pedido>({
    tamanho: "",
    sabor: "",
    personalizar: {
      extra_bacon: false,
      sem_cebola: false,
      borda_recheada: false,
    },
  });
  const [pizzaInfo, setPizzaInfo] = useState<PizzaAllInfoObj | null>(null);
  const { tamanhos, personalizacoes, sabores } = pizzaInfo || {};

  const disableFields = !order.tamanho || !order.sabor;
  const disableSaborFields = !order.tamanho;

  // onChange dos campos exceto o campo Personalizar
  const handleOnChange = (fieldName: string, value: string) => {
    setOrder((curr) => ({
      ...curr,
      [fieldName]: value,
    }));
  };

  // onChange do campo Personalizar
  const handleChangePersonalizar = (fieldName: string, checked: boolean) => {
    setOrder((curr) => ({
      ...curr,
      personalizar: {
        ...curr.personalizar,
        [fieldName]: checked,
      },
    }));
  };

  // pegar as informações das pizzas: personalizacao, sabores e tamanhos
  const getPizzasInfo = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/info-pizzas`, { method: "GET" });
      if (res.status === 200) {
        const info = await res.json();
        const infoObj = criaInfoObj(info) as PizzaAllInfoObj;
        setPizzaInfo(infoObj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // concluir pedido
  const handleSubmit = async (pedido: Pedido) => {
    try {
      const res = await fetch(`${BASE_API_URL}/pedidos`, {
        method: "POST",
        body: JSON.stringify(pedido),
      });
      if (res.status === 201) {
        setError(false);
        navigate("/pedido-concluido"); // redirecionar para a página de sucesso
        return;
      }
      setError(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // pegar informações das pizzas quando o componente renderizar da primeira vez
  useEffect(() => {
    getPizzasInfo();
  }, []);

  return (
    <div className="sm:flex px-3 sm:px-0 justify-center">
      <div className="sm:min-w-[600px] px:pb-5 border rounded-lg ">
        <p className="text-2xl my-3 p-3">Novo Pedido</p>
        {error && (
          <div className="p-2">
            <ErrorAlert />
          </div>
        )}
        <div className="flex flex-col gap-7 sm:gap-5 p-3">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-xl font-medium">Tamanho da Pizza</p>
              <p className="text-sm"> (Obrigatório)</p>
            </div>
            <hr />
            <ul className="mt-2">
              {/* Tamanhos radiobuttons */}
              {tamanhos &&
                Object.keys(tamanhos).map((tamanhoKey) => {
                  const tamanhoPizza = tamanhos[tamanhoKey];
                  const preco = convertToCurrencyForm(tamanhoPizza.preco);
                  return (
                    <li key={tamanhoPizza.value}>
                      <div className="flex gap-3">
                        <input
                          id={tamanhoPizza.value}
                          type="radio"
                          name="tamanho"
                          className="accent-black"
                          value={tamanhoPizza.value}
                          onChange={(e) =>
                            handleOnChange("tamanho", e.target.value)
                          }
                        />
                        <p>
                          {`${tamanhoPizza.label} `}
                          <span className="text-sm">{` (R$ ${preco})`}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-xl font-medium">Sabor da Pizza</p>
              <p className="text-sm"> (Obrigatório)</p>
            </div>
            <hr />
            {/* Apenas mostrar o campo sabores quando o tamanho for escolhido */}
            {!disableSaborFields && (
              <ul className="mt-2">
                {/* Sabores radiobuttons */}
                {sabores &&
                  Object.keys(sabores).map((saborKey) => {
                    const sabor = sabores[saborKey];
                    return (
                      <li key={sabor.value}>
                        <div className="flex gap-3">
                          <input
                            id={sabor.value}
                            type="radio"
                            name="size"
                            className="accent-black"
                            value={sabor.value}
                            onChange={(e) =>
                              handleOnChange("sabor", e.target.value)
                            }
                          />
                          <p>{sabor.label}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">Personalizar Pizza</p>
            </div>
            {/* Apenas mostrar o campo de personalizacoes quando os campos tamanho e sabor forem selecionados */}
            {!disableFields && (
              <>
                <hr />
                <ul className="mt-2">
                  {/* Personalizações checkboxes */}
                  {personalizacoes &&
                    Object.keys(personalizacoes).map((personalizacaoKey) => {
                      const personalizacaoItem =
                        personalizacoes[personalizacaoKey];
                      return (
                        <li key={personalizacaoItem.value}>
                          <div className="flex gap-3">
                            <input
                              id={personalizacaoItem.value}
                              type="checkbox"
                              name={personalizacaoItem.value}
                              className="accent-black"
                              value={personalizacaoItem.value}
                              disabled={disableFields}
                              onChange={(e) =>
                                handleChangePersonalizar(
                                  e.target.name,
                                  e.target.checked
                                )
                              }
                            />
                            <p>
                              {`${personalizacaoItem.label} `}
                              <span className="text-sm">
                                {personalizacaoItem.valor_adicional > 0
                                  ? `(+ R$ ${convertToCurrencyForm(
                                      personalizacaoItem.valor_adicional
                                    )})`
                                  : ""}
                              </span>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </>
            )}
          </div>
          <hr />
          <div>
            <p className="text-lg font-medium">Detalhes do Pedido</p>
            {/* Apenas mostrar os detalhes do pedido quando os campos tamanho e sabor forem selecionados */}
            {!disableFields && pizzaInfo && (
              <>
                <OrderDetails pedido={order} info={pizzaInfo} />
                <div className="flex justify-end mt-4">
                  <button
                    className="rounded-md text-white  bg-black p-2 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={() => handleSubmit(order)}
                    disabled={disableFields}
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
