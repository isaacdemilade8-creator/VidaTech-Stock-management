export function getDashboardStats(products) {
  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity <= 5
  );

  const outOfStock = products.filter(
    (p) => p.quantity === 0
  );

  const mostValuableProduct = products.reduce(
    (max, p) =>
      p.price * p.quantity > (max?.price * max?.quantity || 0)
        ? p
        : max,
    null
  );

  const categories = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return {
    totalProducts,
    totalQuantity,
    totalValue,
    lowStock,
    outOfStock,
    mostValuableProduct,
    categories,
  };
}
