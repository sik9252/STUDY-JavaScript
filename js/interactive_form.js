let shirtSize = [90, 95, 100, 105, 110];
let pantsSize = [24, 26, 28, 30, 32, 34, 36];

$("#option1").on("change", function () {
  $("#option2").html("");
  $(".select-size").show();
  if ($("#option1").val() == "셔츠") {
    // for (i = 0; i < shirtSize.length; i++) {
    //   let selectTemplate = `<option>${shirtSize[i]}</option>`;
    //   $("#option2").append(selectTemplate);
    // }
    shirtSize.forEach(function (i) {
      let selectTemplate = `<option>${i}</option>`;
      $("#option2").append(selectTemplate);
    });
  } else if ($("#option1").val() == "바지") {
    // for (i = 0; i < pantsSize.length; i++) {
    //   let selectTemplate = `<option>${pantsSize[i]}</option>`;
    //   $("#option2").append(selectTemplate);
    // }
    pantsSize.forEach(function (i) {
      let selectTemplate = `<option>${i}</option>`;
      $("#option2").append(selectTemplate);
    });
  } else {
    $(".select-size").hide();
  }
});

// 다크 & 라이트 모드 버튼 제어
let count = 0;
$("#btn").on("click", (e) => {
  count += 1;
  console.log(count);
  // count가 짝수면 Light로 홀수면 Dark로
  if (count % 2 == 0) {
    $("#mode").html("Dark");
    $("#body").css("backgroundColor", "white");
    e.preventDefault();
  } else if (count % 2 == 1) {
    $("#mode").html("Light");
    $("#body").css("backgroundColor", "#373737");
    e.preventDefault();
  }
});
