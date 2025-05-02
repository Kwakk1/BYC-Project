export function FormattedPrice(price: number) {
  return new Intl.NumberFormat("en-Ph", {
    style: "currency",
    currency: "PHP",
  }).format(price);
}
