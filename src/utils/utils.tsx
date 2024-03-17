export const convertToCurrencyForm = (num: number, locale = "pt-BR") => {
  const numAux = num || 0;
  return numAux.toLocaleString(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
