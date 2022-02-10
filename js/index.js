alertBox = document.getElementById("alert");
alertContent = document.getElementById("content");
hideAlert = document.getElementById("hide");

$(".abc").html("안녕하세요");

$("#test").text("안녕");

const checkInput = (style, contents) => {
  alertBox.style.display = style;
  alertContent.innerHTML = contents;
};

hideAlert.addEventListener("click", function () {
  alertBox.style.display = "none";
});
