$("#option1").on("change", function () {
  if ($("#option1").val() == "셔츠") {
    $(".select-size").show();
  } else if ($("#option1").val() == "모자") {
    $(".select-size").hide();
  }
});
