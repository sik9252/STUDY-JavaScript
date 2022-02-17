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

// 상품 가격 낮은순 정렬
$("#btn1").click(function () {
  if ($("#card-group1").hide()) {
    $("#card-group1").show();
    $("#card-group2").hide();
  }
  products.sort(function (a, b) {
    return a.price - b.price;
  });

  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});

// 상품 가격 높은순 정렬
$("#btn2").click(function () {
  if ($("#card-group1").hide()) {
    $("#card-group1").show();
    $("#card-group2").hide();
  }
  products.sort(function (a, b) {
    return b.price - a.price;
  });

  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});

// 상품 가나다순 정렬
$("#btn3").click(function () {
  if ($("#card-group1").hide()) {
    $("#card-group1").show();
    $("#card-group2").hide();
  }
  products.sort((a, b) => {
    if (a.title < b.title == true) {
      return -1;
    } else {
      return 1;
    }
  });

  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});

// 6만원 이하만 보기
$("#btn4").click(function () {
  $("#card-group1").hide();
  $("#card-group2").show();

  const newProducts = products.filter((a) => {
    return a.price <= 60000;
  });

  if ($("#card-group2").empty()) {
    newProducts.forEach((product) => {
      const id = product.id;
      const template = `<div class="card">
    <img src="https://via.placeholder.com/600" />
    <div class="card-body">
      <h5 class="product-name">${newProducts[id - 1].title}</h5>
      <p class="product-price">${newProducts[id - 1].price}</p>
      <button class="btn btn-danger">주문하기</button>
    </div>
  </div>`;
      $("#card-group2").append(template);
    });
  }
});
