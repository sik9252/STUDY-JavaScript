var products = [
  { id: 0, price: 70000, title: "Blossom Dress" },
  { id: 1, price: 50000, title: "Springfield Shirt" },
  { id: 2, price: 60000, title: "Black Monastery" },
];

// 상품 이름
products.forEach((product) =>
  $(".product-name").eq(product.id).html(product.title)
);

// 상품 가격
products.forEach((product) =>
  $(".product-name").eq(product.id).html(`가격: ${product.price}`)
);
