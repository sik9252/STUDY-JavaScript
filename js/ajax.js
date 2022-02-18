$("#btn").click(() => {
  $.ajax({
    url: "https://codingapple1.github.io/data.json",
    type: "GET",
  }).done((data) => {
    $(".card-img-top").attr("src", data.img);
    $(".card-title").html(data.model);
    $(".card-text").html(data.brand);
    $(".price").html(data.price);
  });
});
