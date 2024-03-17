import { Pedido, PizzaAllInfoObj } from "../types";
import {
  calcularTempoPreparo,
  calcularValorTotal,
} from "../utils/pedidoMetodos";
import { convertToCurrencyForm } from "../utils/utils";

interface OrderDeTailsProps {
  pedido: Pedido;
  info: PizzaAllInfoObj;
}

const OrderDetails = ({ pedido, info }: OrderDeTailsProps) => {
  const { tamanhos, personalizacoes, sabores } = info;
  const tempoDePreparo = calcularTempoPreparo(pedido, info);
  const valorTotal = convertToCurrencyForm(calcularValorTotal(pedido, info));

  // verifica se algum item de personalização foi escolhido
  const pedidoPersonalizacoes = Object.keys(pedido.personalizar).filter(
    (key) => pedido.personalizar[key]
  );
  const temPersonalizacao = pedidoPersonalizacoes.length > 0;

  return (
    <div className="text-sm mt-2">
      <table>
        <thead>
          <tr>
            <th className="text-start font-semibold text-lg">Itens</th>
            <th className="font-semibold text-lg">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <hr className="w-full" />
            </td>
          </tr>
          <tr>
            <td className="w-full py-2">
              <span>Tamanho:</span> {tamanhos[pedido.tamanho]?.label}
              <div>Sabor: {sabores[pedido.sabor]?.label} </div>
            </td>
            <td className="whitespace-nowrap text-end">{`R$ ${convertToCurrencyForm(
              tamanhos[pedido.tamanho].preco
            )}`}</td>
          </tr>
          {/* Mostrar os itens de personalização apenas se tiver algum */}
          {temPersonalizacao && (
            <>
              <tr>
                <td colSpan={2}>
                  <hr className="w-full" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="font-semibold mt-1">Personalizações </div>
                </td>
              </tr>
              {pedidoPersonalizacoes.map((personalizacaoKey) => {
                const item = personalizacoes[personalizacaoKey];
                const valorAdicional = convertToCurrencyForm(
                  item.valor_adicional
                );
                return (
                  <tr key={item.value}>
                    <td className="w-full py-1">
                      <div>{item.label}</div>
                    </td>
                    <td className="whitespace-nowrap text-end py-2">
                      <div>{`R$ ${valorAdicional}`}</div>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      <hr />
      <div className="flex justify-end mt-2 text-base">
        Total: <span className="font-bold ml-2">{`R$ ${valorTotal}`}</span>
      </div>
      <div className="flex justify-end text-base">
        Tempo de Preparo:{" "}
        <span className="font-bold ml-2">{`${tempoDePreparo} minutos`}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
