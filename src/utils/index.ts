export function formatPrice (price: number | bigint): string {
  const formatOptions = { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0 }
  return new Intl.NumberFormat('es-CO', formatOptions).format(price)
}
