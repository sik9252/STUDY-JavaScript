// 로그인 모달창 slide down 애니메이션
$("#login").on("click", function () {
  $(".black-bg").show().addClass("slide-down");
});

$(".black-bg").on("click", function (e) {
  //console.log(e.currentTarget);
  //console.log(e.target);
  if (e.target == e.currentTarget) {
    $(".black-bg").hide().removeClass("slide-down");
  }
});

// 로그인 창 입력 폼 검사
$("form").on("submit", function (e) {
  if ($("#email").val() === "") {
    e.preventDefault();
    $("#email-alert").show();
  } else if ($("#password").val() === "") {
    e.preventDefault();
    $("#password-alert").show();
  }
});

// show menu 버튼 누르면 슬라이딩
$("#show-menu").on("click", function () {
  $("#menu").animate({ marginLeft: "0px" }, 500);
});
