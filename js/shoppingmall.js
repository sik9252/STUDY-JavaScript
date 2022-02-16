var products = [
  { id: 0, price: 70000, title: "Blossom Dress" },
  { id: 1, price: 50000, title: "Springfield Shirt" },
  { id: 2, price: 60000, title: "Black Monastery" },
];

// 상품 이름
products.forEach((product) => {
  const id = product.id;
  $(".product-name").eq(id).html(products[id].title);
  $(".product-price").eq(id).html(`가격: ${products[id].price}`);
});

// 상품 가격 오름차순 정렬
$("#sort-cheap").click(function () {
  products.sort(function (a, b) {
    return a.price - b.price;
  });

  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});

// 상품 가격 내림차순 정렬
$("#sort-expensive").click(function () {
  products.sort(function (a, b) {
    return b.price - a.price;
  });

  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});
