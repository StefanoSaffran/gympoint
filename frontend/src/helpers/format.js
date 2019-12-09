export const unFormat = target =>
  target
    .toString()
    .replace(/[R$.]/g, '')
    .replace(',', '.');

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
