export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const formatArea = (value: number) => `${value.toFixed(1)} m²`;
