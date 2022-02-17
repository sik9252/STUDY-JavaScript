# STUDY-javascript

자바스크립트에 대한 공부 기록

---

<a href="https://codingapple.com/">공부할때 수강한 인강</a>

웹 환경에서 JavaScript의 목적: HTML의 조작과 변경

---

## script 태그의 위치 선정

위치 선정 이전에 알아야 할 지식이 있다. 바로 브라우저가 HTML 태그를 읽는 법인데 이를 HTML 파싱이라고 한다. 또한 브라우저는 HTML을 위에서부터 아래로 읽어내려간다.

### ① head 태그 내부

body 내부에 들어있는 UI들은 브라우저가 자신들보다 위에 있는 head 안의 script들을 다운로드 하는동안 파싱이 되다 말 것이다.

=> 사용자 경험에 좋지 않는 영향을 주게됨

=> 아직 존재하지 않는 DOM 요소에 접근하게 될 가능성이 있음

### ② body 태그가 끝나기 직전

일단 HTML 파싱이 다 된 후에 스크립트를 읽어가므로 외관상으로는 문제가 없지만 자바스크립트에 의존적인 웹이라면 기능들이 작동하지 않는 문제가 발생한다.

### ③ head 안에서 async를 이용

async는 HTML을 파싱하다가 script 태그를 만나면 남은 HTML을 파싱하면서 script를 다운로드한다. 다만 `script의 파일은 다운로드 -> 실행 HTML 파싱이 함께 되지만, 실행 도중에는 파싱이 멈추게 된다.

### ④ head 안에서 defer를 이용

마찬가지로 HTML을 읽다가 script 태그를 만나면 남은 HTMl 파싱과 동시에 script를 다운로드한다. 다만, `다운로드 후 바로 실행이 되는 것이 아니라 HTML 파싱이 완료된 후에 script를 실행`한다.

따라서 요 방법이 제일 나은 방법이라고 할 수 있을것 같다.

하지만, 개발자라면 매번 다른 환경에서의 가장 적절한 방법을 선택해야 하는법이므로 현재로서는 ④번이 최고같지만 이외의 방법들도 알고 있는게 좋을 것 같다.

**요약**

> DOM을 따라 반드시 순서대로 실행되어야 한다면 `<script>`

> DOM이나 다른 스크립트에 의존성이 없고, 실행 순서가 중요하지 않은 경우라면 `<script async>`

> DOM이나 다른 스크립트에 의존성이 있고, 실행 순서가 중요한 경우라면 `<script defer>`

---

## Selector

```js
document.getElementById("").innerHTML = "";
```

예를 들어 아래와 같은 html 코드가 있다고 가정했을때

```html
<body>
  <h2 id="hello">안녕하세요</h2>
</body>
```

```js
document.getElementById("hello").innerHTML = "안녕하세요";
```

라고 하면 "안녕"이라는 글자가 "안녕하세요"로 변경된다.

```js
document.getElementById("hello").style.fonstSize = "30px";
```

라고 하면 해당 id에 해당하는 글자 크기가 30px로 바뀐다.

※ Selector는 여러개가 있다. 여기서 getElementById와 getElementsByClassName을 가장 자주 사용하는데 후자의 경우 같은 이름을 가진 모든 클래스를 찾기 때문에 X번째 것을 선택하려면 아래와 같이 적어줘야 한다.

```js
document.getElementsByClassName("클래스명")[X];
```

.querySelector라는 것도 있다.

```js
// 해당 이름을 가진 요소 하나만 선택
document.querySelector("#test");
// 같은 이름을 가진 여러 요소중에 X번째를 선택
document.querySelectorAll("#test")[X];
```

---

## onclick 속성

```html
<div class="alert-box" id="alert">Alert Box</div>
<button onclick="showAlert()">Click</button>
```

html에서 클릭하면 이벤트를 실행해줄 요소에 onclick="함수명" 속성을 준다.

```js
alertBox = document.getElementById("alert");
const showAlert = () => {
  alertBox.style.display = "block";
};
```

그리고 javascript로 onclick 속성이 붙어있는 요소와 상호작용시 실행할 함수를 구현한다.

---

## 함수 파라미터

위에서 alert 창을 열고 닫을 때 showAlert()이란 함수와 hideAlert()이란 함수 2개를 만들었다.

하지만, 함수의 파라미터를 이용해 값을 전달하면 하나의 함수로 여러가지의 기능을 구현할 수 있다.

위에서 구현한 alert 창을 열고 닫는 함수를 파라미터를 이용해 하나로 압축해보자.

### 기존 코드

기존 코드는 alert 박스의 열기, 닫기 함수를 2개 따로 구현했고 함수의 파라미터로 아무것도 전달하고 있지 않다.

```html
<div class="alert-box" id="alert">
  Alert Box <button onclick="hideAlert()">닫기</button>
</div>
<button onclick="showAlert()">Click</button>
```

```js
alertBox = document.getElementById("alert");
// 열고 닫는 함수를 각각 구현함
const showAlert = () => {
  alertBox.style.display = "block";
};
const hideAlert = () => {
  alertBox.style.display = "none";
};
```

### 변경한 코드

변경한 코드는 alert 박스의 열기, 닫기를 함수의 파라미터로 서로 다른 값을 주어 하나의 함수를 통해 서로 다른 동작을 하고 있다.

```html
<div class="alert-box" id="alert">
  Alert Box <button onclick="changeAlert('none')">닫기</button>
</div>
<button onclick="changeAlert('block')">Click</button>
```

```js
alertBox = document.getElementById("alert");
// 함수를 하나만 구현함
const changeAlert = (style) => {
  alertBox.style.display = style;
};
```

※ 함수 파라미터를 여러개 전달할 수도 있다!

```js
alertBox = document.getElementById("alert");
alertContent = document.getElementById("content");

// 이런식으로
const checkInput = (style, contents) => {
  alertBox.style.display = style;
  alertContent.innerHTML = contents;
};
```

---

## EventListener

html 코드에 onclick과 같은 속성을 주지 않아도 같은 기능을 구현할수 있게 해줌.

`addEventListener(event명, 실행할 함수);` 형태로 사용한다.

사용할수 있는 event명에는 click, scroll, mouseover, keydown... 등 여러 이벤트가 존재한다.

위의 닫기 버튼에 직접 onclick 속성을 사용하지 않고 기능을 구현해보자.

```html
<!-- 변경 전 -->
<button onclick="changeAlert('none')">닫기</button>

<!-- 변경 후 -->
<button id="hide">닫기</button>
```

html 코드를 이렇게 간단히 바꿔주고

```js
hideAlert = document.getElementById("hide");
alertBox = document.getElementById("alert");

hideAlert.addEventListener("click", function () {
  alertBox.style.display = "none";
});
```

javascript 코드를 위처럼 작성해주면 된다.

`[의미]`: id명이 hide인 요소에 click이란 동작이 인식되면 그것의 display style을 none으로 지정하라.

---

## jQuery 기초

Javascript의 긴 코드 양을 줄여주는 라이브러리

jQuery 파일을 다운받아 프로젝트에 첨부한 후 `<script src=""></script>`로 경로를 추가해주면 된다. 혹은 CDN으로 설치할수도 있다.

### 기본 문법

```js
// jQueryJavascript
document.getElementById("test").innerHTML = "";
document.getElementsByClassName("test").innerHTML = "";
document.getElementById("test").style.color = "red";

// jQuery
$("#test").html("안녕하세요");
$(".test").text("안녕하세요");
$(".test").css("color", "red");
```

### jQuery 사용 이유

① 자바스크립트 코드 줄일수 있음

② 짧은 코드로 여러 요소를 한번에 변경이 가능함

예를들어 아래와 같은 html 코드가 있다고 가정하고 3개의 요소의 내용을 변경해야 한다고 해보자.

```html
<p class="abc">안녕</p>
<p class="abc">안녕</p>
<p class="abc">안녕</p>
```

이런 경우 순수 자바스크립트의 경우 요소를 하나씩 선택해 변경해줘야 한다.

```js
// 이렇게 하면 적용 안됨
document.getElementsByClassName("abc").innerHTML = "안녕하세요";

// 이렇게 요소 하나씩 변경해줘야함
document.getElementsByClassName("abc")[0].innerHTML = "안녕하세요";
document.getElementsByClassName("abc")[1].innerHTML = "안녕하세요";
document.getElementsByClassName("abc")[2].innerHTML = "안녕하세요";
```

그런데 jQuery를 사용하면 아래의 단 한줄로 변경이 가능하다.

```js
$(".abc").html("안녕하세요");
```

이벤트 리스너와 같은 경우도 마찬가지다.

버튼이 여러개 있고 각 버튼을 누르면 같은 경고창을 보여줘야 한다고 하자.

```html
<button class="btn">버튼</button>
<button class="btn">버튼</button>
<button class="btn">버튼</button>
```

그냥 순수 자바스크립트의 경우 이렇게 짜야하는데

```js
document.getElementsByClassName("btn")[0].addEventListener(기능);
document.getElementsByClassName("btn")[1].addEventListener(기능);
document.getElementsByClassName("btn")[2].addEventListener(기능);
```

jQuery를 이용하는 경우 요렇게 짧게 작성하면 된다!

```js
$(".btn").on("click", function () {});
```

③ 애니메이션 UI를 쉽게 만들수 있음

만약 버튼을 눌렀을때 특정 박스(글자)가 사라지게 하고싶다면 순수 자바스크립트의 경우 이렇게 작성해야 한다.

```js
document
  .getElementsByClassName("btn")[0]
  .addEventListener("click", function () {
    document.getElementsByClassName("abc")[0].style.display = "none";
  });
```

어휴 길어.. 그런데 jQuery를 사용하면 짧게 작성할 수 있다.

```js
$(".btn").on("click", function () {
  $(".abc").hide();
});
```

그리고 slideup()이나 이런 것들을 사용해서 순수 자바스크립트만으로는 쉽게 구현하기 힘든 애니메이션도 단방에 구현할 수 있다.

---

## UI 모달 창 만들기

```
실습 파일

1. ./Level-1/html/modal.html
2. ./Level-1/css/modal.css
```

모달 창은 모든 요소들중 가장 앞에 등장해야 하므로 z-index 와 같은 것을 이용해 위치를 조절해준다. 또한 z-index는 position 속성이 들어간 요소들에 쓸 수 있는 속성이기 때문에 position: fixed를 이용해 브라우저 화면에 딱 달라붙게 만들어 주는것도 좋다.

만드는 것은 간단해서 적을게 별로 없었는데 **이번 모달 창 만들기 실습을 하면서 의문이 들었던 점**이 있었다.

나는 이 실습을 할때 Bootstrap과 jQuery 스크립트를 외부에서 가져와 연결해주었는데 전에 body 태그의 맨 마지막에 script 태그들을 모두 넣는것보다 head 안에서 defer을 사용하면 더 효율적이다 라고 공부한 것 같아서 `Bootstrap과 jQuery를 받아오는 script 태그를 모두 head 안에 넣고 defer 속성을 붙여`주었다. (알기로 defer와 같은 속성은 src 속성이 존재하는 script에만 사용이 가능하다고 했다.) `그런데 갑자기 아무리 버튼을 눌러도 만든 모달 창이 뜨지 않는 것`이었다.

그래서 원래 있던대로 body 태그 마지막에 Bootstrap, jQuery, 내가 만든 script 태그 순으로 다시 작성해주었더니 이번에는 또 정상 작동을 했다.

혹시? 해서 이번에는 body 태그 마지막에 내가 만든 script 태그, Bootstrap, jQuery 순으로 작성했더니 버튼을 아무리 눌러도 모달창이 또 열리지 않았다.

일단 내가 만든 script 태그, Bootstrap, jQuery 순으로 작성했던 제일 마지막 시도는 내가 만든 script 태그에서는 Bootstrap의 버튼도 참조해야하고, jQuery도 사용해야 하는데 그것들이 다운로드되고 실행되기 이전에 사용하려고 해서 그런것 같았다.

하지만, defer 태그를 사용한 것은 왜 안되는지 계속 의문이여서 1시간 가까이 그것에 대해 고민해보았다.

내가 세운 가설은 이렇다.

일단 나는 아래와 같은 형식으로 코드를 작성했었다.

```html
<html>
  <head>
    <!-- src 파일 이름은 임시로 지은것 -->
    <script defer src="bootstrap.js"></script>
    <script defer src="jQuery.js"></script>
  </head>
  <body>
    <!-- 누르면 모달창이 나오는 버튼 -->
    <a href="#" class="btn btn-primary btn-lg" id="login" role="button">
      Login
    </a>
    <!-- 내가 만든 script -->
    <script>
      $("#login").on("click", function () {
        $(".black-bg").show();
      });
    </script>
  </body>
</html>
```

일단 defer 스크립트의 실행은 HTML의 페이지 구성이 끝날때까지 지연된다. 따라서 아래와 같은 시나리오를 생각해볼 수 있다.

1. Bootstrap이 deferred 된다.
2. jQuery가 deferred 된다.
3. jQuery에 의존하는 Bootstrap 버튼을 로드하는 내가 만든 script 블록이 실행되야 하는데 지연된 Bootstrap과 jQuery가 deferred되어 아직 로드되지 않았기 때문에 실행이 중단된다. **아마 그래서 버튼을 눌러도 모달창이 보이지 않았던것같다.**
4. Bootstrap과 jQuery가 실제로 로드된다.

여기저기 검색하면서 알아낸 지식을 바탕으로 나의 생각을 적어본것이라 정확하다고 할수 없기 때문에 참고만 하길 바란다.

---

## form 태그와 조건문

위에서 만든 모달창이 '안녕'이란 값을 입력한뒤 Login 버튼을 눌렀을때만 열리도록 바꿔보자.

```html
<script>
  $("#login").on("click", function () {
    if ($("#input-check").val() === "안녕") {
      $(".black-bg").show();
    }
  });
</script>
```

id가 input-check인 입력칸을 만들어주고 `$("#input-check").val()`로 입력받은 값을 가져와 지정한 값과 비교해 일치하는 경우에만 아래 코드가 실행되도록 할 수 있다.

여러 다른 프로그래밍 언어와 같이 if, else if, else 구문을 사용할 수도 있고 &&, || 등을 이용해 여러 조건을 결합할수도 있다.

이제 더욱 응용해서 이메일과 비밀번호 입력 폼을 만든 뒤 입력된 이메일 혹은 비밀번호 중 둘중에 하나라도 입력되지 않았는데 전송 버튼을 누르면 폼의 전송을 막고 경고창이 뜨도록 만들어보자.

```html
<script>
  $("form").on("submit", function (e) {
    if ($("#email").val() === "" || $("#password").val() === "") {
      e.preventDefault();
      alert("이메일 혹은 비밀번호를 입력해주세요.");
    }
  });
</script>
```

처음에 아무 생각 없이 $("전송 버튼의 id명").on("click", function () {}); 라고 작성했더니 입력 폼을 모두 채우지 않고 전송 버튼을 눌러도 경고창이 안뜨고 폼의 전송이 완료되었다. 이렇게 적으면 안되고 위와 같이  `$("form").on("submit", function (e)`로 적어야된다.

**e.preventDefault(); 란?**

a 태그 혹은 submit 태그는 누르게 되면 링크를 이동시키거나 창을 새로고침하게 된다. 이러한 동작을 막아주는것이 preventDefault()의 역할이라고 할 수 있다. 만약 이걸 작성하지 않으면 폼이 submit 됨과 동시에 새로고침하게 되기 때문에 입력한 값들이 사라지고 다시 초기 화면으로 돌아오게 된다. 그리고 폼도 전송되게 된다. 즉, 자연적으로 발생하는 브라우저의 고유 동작을 중단시켜주는 역할을 한다고 할 수 있다.

**주 사용처**

- a 태그 클릭시 이동 금지 조건 걸때
- submit시 리프레쉬 방지

마지막으로 email이나 password의 칸이 입력되지 않았을때 경고창이 아닌 입력 폼 아래 XXX을 입력하세요. 라는 숨겨져있던 박스가 나타나게 해보자.

1️⃣ email과 password를 입력하는 칸 아래에 p 태그를 이용해 경고 박스를 생성하고 display: none; 으로 박스의 기본 상태를 숨김으로 하자.

```html
<!-- display: none; -->
<p id="email-alert">이메일을 입력해주세요.</p>
<p id="password-alert">비밀번호를 입력해주세요.</p>
```

2️⃣ 전송 버튼을 눌렀을때 email과 password 칸이 공백인지 검사한 후 공백이라면 만든 p 박스를 show()를 이용해 보여준다.

```html
<script>
  $("form").on("submit", function (e) {
    if ($("#email").val() === "") {
      e.preventDefault();
      $("#email-alert").show();
    } else if ($("#password").val() === "") {
      e.preventDefault();
      $("#password-alert").show();
    }
  });
</script>
```

**참고**

1. `==`는 느슨한 비교로 데이터의 타입이 같지 않아도 알아서 한쪽의 타입을 변환한 뒤 검사해 맞으면 참으로 판정함.

`===`는 엄격한 비교로 애초에 데이터의 타입까지 같아야 참으로 판정함

2. stopPropagation()이란 것도 있음. 얘는 쉽게 말하면 부모 엘리먼트에게 이벤트 전달을 중단해야 할 떄 쓰이는 함수라고 할 수 있는데 이것을 제대로 알려면 어떠한 태그를 클릭했을때 해당 태그만이 클릭을 감지하는 것이 아닌 태그를 감싸고 있는 부모 태그들도 클릭을 인식하고 반응한다는 것을 알아야 한다. 그리고 이러한 동작을 `버블링`이라고 한다. 그리고 `버블링 현상을 막는것`이 stopPropagation() 함수이다.

3. form과 관련된 이벤트들

`$("form").on("이곳에 사용한다", function (e) {}`

- input: 해당 요소 내부에 입력된 값이 바뀔 때마다 작성한 코드를 실행해준다.
- change: 해당 요소 내부에 입력된 값이 바뀔 때마다 작성한 코드를 실행해준다. 단, 값이 변경되고 요소에 focus가 해제되었을때 실행된다. (예전에 사용했던 onBlur()과 비슷한것 같다.)

---

## var, let, const

변수에서 가장 중요한 3가지

1. 선언: 자바스크립트 엔진에게 변수의 존재를 알리는것
2. 할당/재할당: 값을 집어넣는것
3. 범위: 변수가 쓰이는 범위(함수 내부, 외부)

자바스크립트에서 변수의 선언은 `선언 -> 초기화` 단계를 거쳐 수행된다.

**var**

- scoped: 함수
- 재선언 O
- 재할당 O
- 선언과 초기화 단계가 한번에 진행
- 따라서 자바스크립트 엔진에 변수의 존재를 알린뒤 즉시 초기화 단계에서 undefined로 초기화 하기 때문에 선언문 이전에 변수에 접근해도 에러의 발생 없이 undefined를 출력. 이후 변수 할당문에 도달하면 비로소 값이 할당

`선언 단계 + 초기화 단계 -> 할당 단계`

**let**

- scoped: 블록
- 재선언 X
- 재할당 O
- 선언과 초기화 단계가 분리되어 진행, 초기화 단계는 변수 선언문에 도달했을때 실행됨
- 따라서 초기화 단계가 실행되기 이전에 접근하려고 하면 참조 에러 발생 -> TDZ(일시적 사각지대) 구간에 존재

`선언 단계 -> TDZ -> 초기화 단계 -> 할당 단계`

**const**

- scoped: 블록
- 재선언 X
- 재할당 X
- 반드시 선언과 동시에 값을 초기화 해야함

var 키워드는 중복 선언이 가능해 예기치 못한 값을 반환할 수 있으며 변수 선언문 이전에 변수를 참조해도 에러 대신 undefined를 반환한다. 이러한 이유들 때문에 ES6 이후로는 let과 const를 사용하는 것을 권장한다.

### 호이스팅

자바스크립트 엔진은 코드를 순차적으로 실행하기에 앞서 변수/함수 선언을 찾아내 먼저 메모리에 저장해둔다. 이러한 현상을 호이스팅이라고 한다.

---

## jQuery로 애니메이션 만들기

`.animate({})`라는 함수를 사용해서 만들 수 있다. 또한 css 속성은 camelCase 형태로 작성해야 한다.

```html
<script>
  $("#id명").click(function () {
    $("#id명").animate({ marginLeft: "100px", marginTop: "100px" }, 100);
  });
</script>
```

이런식으로 {}안에 ,를 통해 여러 css를 작성해줄수도 있고, animate 함수의 2번째 인자로 숫자를 주어 애니메이션의 동작 속도를 조절할수도 있다.

또한 아래 코드처럼 jQuery 함수 여러개를 붙여 사용할수도 있다. 이 경우 순차적으로 실행된다. 아래의 경우 show() -> animate() 순으로

```html
<!-- show()와 animate() 함수를 붙여서 한번에 작성함 -->
<script>
  $("#login").on("click", function () {
    $(".black-bg").show().animate({ marginTop: "0px" });
  });
</script>
```

하지만, jQuery의 animation() 함수를 사용해 애니메이션을 만드는것은 쉽긴 하지만 잘 사용하는 방법이 아니고 .css()함수를 이용해 만드는것이 더 낫다고 한다.

<br>

**.css() 이용하기**

```css
.black-bg {
  /* 일단 이렇게 항상 보이게 해주고 */
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  /* transition으로 스무스하게 움직이도록 설정 */
  transition: all 1s;
  /* 모달창 아예 안보이게 위로 밀어넣기 */
  transform: translateY(-500);
}
```

이때 transform 대신 margin-top을 사용해도 되는데 transform을 사용하는 것이 더 부드럽고 자연스럽다! 따라서 `transform을 애용`하도록 하자.

```html
<!-- .css() 함수 사용 -->
<script>
  $("#login").on("click", function () {
    $(".black-bg").css("margin-top", "0px");
  });
</script>
```

<br>

**addClass() 이용하기**

addClass()를 이용해 아예 애니메이션 클래스를 새로 만들어주는 법도 존재한다. 이렇게 css class를 부착하는 방법으로 시작/최종 애니메이션 화면을 개발하는 습관을 들이는것이 여러모로 좋을 것 같다. 작게 한가지 기능만으로 나누어두면 나중에 유지보수가 편할것 같은?

```css
/* slide-down 이란 클래스 스타일을 하나 만들어두고 */
.slide-down {
  transform: translateY(0px);
}
```

```html
<script>
  // addClass()로 slide-down 클래스를 추가
  $("#login").on("click", function () {
    $(".black-bg").addClass("slide-down");
  });
</script>
```

---

## 정규표현식

정규식은 문자(열)을 검사하고 싶을때 사용하는 식이다.

```js
/abc/.test("검사할 문자열");
```

test는 정규식에 사용하는 함수인데 입력을 검사할 문자열을 파라미터로 넣어주면 된다.

이메일 형식 검사 같은 경우에 사용한다.

정규식 문법은 다양하므로 그때 그때 필요한것을 찾아 사용하는것이 좋을 것 같다.

---

## 이벤트 버블링과 함수

위에서 preventDefault() 함수 배울때 stopPropagation() 함수에 대해 조사해봤던적이 있다. 이때 조사한 것을 실제로 실습해보는 시간을 가졌다.

실습으로는 이전에 만든 모달창에 모달창이 아닌 다른 부분을 클릭하면 모달창이 닫히는 기능을 구현해보았다.

```html
<script>
  $("#black-bg").on("click", function () {
    $("#black-bg").hide();
  });
</script>
```

일단 이런식으로 작성하면 모달창이 아닌 다른 부분을 클릭했을때 모달창이 사라지기는 한다. 하지만 `모달창 자체를 클릭했을때도 사라져버리는 현상`이 있다.

이러한 현상이 일어나게 되는 이유가 바로 `이벤트 버블링` 때문인데 버블링이란 `어떤 요소에 특정 이벤트가 일어나면 그 상위요소들에도 해당 이벤트가 일어나게 되는 현상`을 말한다.

```html
<div class="black-bg">
  <div class="white-bg">모달창</div>
</div>
```

이렇게 모달창을 구현한 코드를 보면 black-bg 안에 white-bg가 있기 떄문에 모달창 자체인 white-bg를 클릭하면 버블링 현상에 의해 상위 요소인 black-bg에도 클릭 이벤트가 일어나게되므로 모달창이 사라지게 되는 것이다.

이제 이를 해결하려면 일단 이벤트리스너 안에서 사용 가능한 이벤트 함수들을 알아야 한다.

- e.target: 실제로 클릭한 요소
- e.currentTarget: 이벤트리스너가 달린 요소
- e.preventDefault: 브라우저의 기본 동작을 방지 $(this)와 동일
- e.stopPropagation: 이벤트 버블링 방지

따라서 위의 이벤트 함수들 중에 지금 실제로 클릭한 것이 black-bg일때만 모달창 숨기기 기능이 실행되게끔 해줄수 있는 함수를 골라 코드를 짜면 될것같다.

```html
<script>
  $(".black-bg").on("click", function (e) {
    // 이렇게 조건문으로 클릭한 요소가 black-bg인지 확인
    if (e.target == e.currentTarget) {
      $(".black-bg").hide().removeClass("slide-down");
    }
  });
</script>
```

e.currentTarget은 이벤트리스너가 달린 요소로 black-bg를 가리키고 e.target은 실제로 클릭한 요소를 가리키므로 모달창(white-bg안의 모든것)을 제외한 검은 배경을 누르면 black-bg를 가리키게 되므로 서로가 일치해 모달창이 숨겨지게 된다.

<br>

**실습하면서 겪은 오류**

내가 원래 짠 코드에 hide() 를 추가해서 모달창을 숨기는 기능을 추가하기 이전에 나는 분명 login 버튼을 누르면 addClass()로 slide-down이란 클래스를 추가해 모달창이 위에서부터 슥 내려오도록 구현했었다. 그런데 hide()를 이용해 모달창을 숨기고 나서 새로고침 없이 바로 login 버튼을 누르면 모달창이 다시 슬라이딩해서 나와야 하는데 나오지 않았다.

**해결법**

특정 요소에 addClass()를 해줬으면 그 특정 요소가 사라질때 removeClass()를 해주니까 해결되었다. 요소가 사라졌는데도 Class가 계속 남아있어 저런 현상이 일어났던것 같다.

---

## Array, Object와 데이터 바인딩

**Array 자료형**

```js
let array = ["red", "orange", "yellow"];
console.log(array[1]); // orange
```

**Object 자료형**

```js
// key: value 쌍의 형식으로 저장함
let Obj = { color: "red", hex: "ff0000" };
console.log(Obj.color); // red
console.log(Obj["color"]); // red
```

그럼 위의 방식으로 구성된 데이터들을 가지고 실제 사이트에 데이터를 어떻게 적용할수 있는지 생각해볼수 있다.

```js
let ArrayData = ["BMW", 520];
let ObjData = { brand: "BMW", model: 520 };
```

위와같은 데이터가 존재한다고 했을때 쇼핑몰 사이트에 브랜드명과 모델명을 출력하는 코드를 작성해보았다.

```html
<p id="title">브랜드명</p>
<p id="name">모델명</p>

<script>
  // 배열로 구성된 데이터들을 꺼낼때
  document.getElementById("title").innerHTML = ArrayData[0];
  document.getElementById("name").innerHTML = ArrayData[1];

  // 객체로 구성된 데이터들을 꺼낼때
  document.getElementById("title").innerHTML = ObjData.brand;
  document.getElementById("name").innerHTML = ObjData.model;

  // jQuery로 작성하면
  $("#title").html(ArrayData[0]);
  $("#name").html(ArrayData[1]);

  $("title").html(ObjData.brand);
  $("name").html(ObjData.model);
</script>
```

그렇다면 데이터들이

```js
let data = [{ brand: "BMW" }, { model: 520 }];
```

와 같이 존재한다고 할때 브랜드명을 출력하려면 코드를 어떻게 작성해야 하는지도 생각해볼수 있을것 같다.

```js
$("title").html(data[0].brand);
```

위와 같이 작성하면 되고 이렇게 자바스크립트로 데이터를 뽑아 출력하는것을 `데이터바인딩`이라고 한다.

---

## 인터랙티브한 form 만들기(1)

실습 파일: interactive_form.html/.css/.js

**조건**

1. 옷의 종류(셔츠, 모자, 바지 등)를 고르는 select 폼이 있다.
2. 평소에는 보이지 않지만, 만약 셔츠를 고르면 셔츠의 사이즈를 선택하는 폼이 나타나야 한다. (다른 옷의 종류를 선택했을때도 마찬가지이다.)

이런 폼을 만들고 싶은 경우 `input과 change 이벤트`에 대해 알아야 한다.
위에서 잠깐 배웠던 form 이벤트 관련 속성들 중 input과 change가 이에 해당한다.

```js
$("변경을감지할 인풋").on("change", function () {
  // 값 변경시 수행되어야할 동작
});
```

이런 형태로 구현하면 될것 같다.

실제로 구현한 코드는 아래와 같다.

1️⃣ 부트스트랩과 select 태그를 이용해 선택 목록을 만들어준다.

```html
<!-- 옷의 종류 선택 -->
<select class="form-control" id="option1">
  <option>모자</option>
  <option>셔츠</option>
</select>

<!-- 사이즈 선택 -->
<div class="select-size">
  <select class="form-control" id="option2">
    <option>95</option>
    <option>100</option>
    <option>105</option>
  </select>
</div>
```

2️⃣ 자바스크립트를 이용해 id가 option1인 것의 값이 '셔츠' 일때만 아래의 사이즈 선택 선택목록이 보이도록 한다.

```css
/* 일단 기본 상태는 안보이는 상태여야 한다. */
.select-size {
  display: none;
}
```

```js
$("#option1").on("change", function () {
  if ($("#option1").val() == "셔츠") {
    $(".select-size").show();
  } else if ($("#option1").val() == "모자") {
    $(".select-size").hide();
  }
});
```

- $("#option1').val() : 현재 선택된 option1의 값

---

## 인터랙티브한 form 만들기(2)

이전에는 셔츠를 선택했을때에만 사이즈를 선택하는 부분이 나왔는데 이번에는 바지를 선택하면 바지 사이즈를 선택하는 부분이, 셔츠를 선택하면 셔츠 사이즈를 선택하는 부분이 나오도록 해보았다.

선택한 항목에 따라 사이즈를 선택하는 폼이 따로따로 나오게 하기 위해서 `자바스크립트로 HTML을 만들고 집어넣는법`에 대해 배웠는데 과정을 간단히 나타내보면 다음과 같다.

1. 템플릿 만들기
2. jQuery의 append()로 넣기

최종 코드는 아래와 같다.

```js
$("#option1").on("change", function () {
  // 값의 변경이 일어났을때 text를 초기화하고, size 선택칸을 보여준다
  $("#option2").html("");
  $(".select-size").show();
  // 만약 선택한 값이 셔츠라면
  if ($("#option1").val() == "셔츠") {
    // 보여줄 템플릿을 만들고
    let selectTemplate = `<option>95</option>
      <option>100</option>
      <option>105</option>`;
    // append로 해당 템플릿을 원하는 곳에 추가한다.
    $("#option2").append(selectTemplate);
  }
  // 만약 선택한 값이 바지라면
  else if ($("#option1").val() == "바지") {
    let selectTemplate = `<option>26</option>
      <option>28</option>
      <option>30</option>`;
    $("#option2").append(selectTemplate);
  }
  // 아무것도 선택 안한 상태라면 사이즈 선택칸 숨기기
  else {
    $(".select-size").hide();
  }
});
```

하지만 이후에 선택가능한 사이즈가 10개 이상으로 늘어나게 된다면 늘어나는 사이즈 개수만큼 하드코딩을 하는것은 비효율적이다. 이런 경우에는 `출력해야할 데이터들은 배열과 같은 곳에 한번에 정리`해두고 `forEach`와 같은 반복문을 통해 코드를 간단하게 줄일수 있다.

### 일반 반복문으로 구현

```js
for (i = 0; i < shirtSize.length; i++) {
  let selectTemplate = `<option>${shirtSize[i]}</option>`;
  $("#option2").append(selectTemplate);
}
```

### forEach를 이용해 구현

`배열이름.forEach(함수)`와 같은 형태로 작성한다.

```js
shirtSize.forEach(function (i) {
  // 반복동안 실행할 동작 작성
});
```

위에서 일반 반복문인 for을 사용해 구현한 것을 forEach로 바꾸면 아래와 같다.

```js
shirtSize.forEach(function (i) {
  let selectTemplate = `<option>${i}</option>`;
  $("#option2").append(selectTemplate);
});
```

`이때 i는 배열의 인덱스인 0,1,2...를 나타내는것이 아닌 배열의 원소 값을 나타낸다.`
즉, let shirtSize = [90, 95, 100, 105, 110];와 같은 배열이 있으면 90, 95, 100...을 나타낸다는 것이다. (마치 파이썬의 for i in shirtSize와 같은 느낌이다.)

---

## Array of Object 다루기

**실습 파일: shoppingmall.html/.css/.js**

쇼핑몰 상품 진열대를 만드는 실습을 통해 Array안의 Object를 다루는 것에 익숙해지도록 노력하였다.

### 웹 개발 방식 2가지

- 서버에서 HTML 파일을 미리 다 완성해서 전달
- 서버에서 텅 빈 HTML 파일과 데이터를 전달하고 프론트에서 JS로 HTML 완성

2번째 방식이 트렌드!

그리고 사실 서버에서 데이터를 가져오려면 Ajax라는 것을 알아야 하지만 아직 배우지 않은 관계로 데이터를 미리 가져왔다고 가정하고 실습을 진행하였다.

```js
var products = [
  { id: 0, price: 70000, title: "Blossom Dress" },
  { id: 1, price: 50000, title: "Springfield Shirt" },
  { id: 2, price: 60000, title: "Black Monastery" },
];
```

이러한 상품 데이터들을 가져왔다고 가정하고 각각의 상품에 해당하는 title과 price를 출력하도록 구현하였다.

### 결과

```js
// 상품 데이터
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
```

<image src="./images/shoppingmall.png" style="margin:auto">

<br>

### 이번 실습을 통해 알게된 점 정리

`id와 class의 차이`를 알게되었는데, 이를 알게된 계기는 일단 자바스크립트로 각각의 상품에 데이터바인딩을 하려고 상품 제목에 id='product-name'을, 상품 가격에 id='product-price'라는 `id 값을 부여`하고 jQuery를 이용해 $('#product-name').html(products[0].title); 이렇게해서 데이터를 입혀주었다. 그런데 세 상품 모두 동일한 id 이름을 부여해주었기 때문에 세 상품의 이름이 모두 같은것으로 바뀔줄 알았는데 `맨 처음요소 하나만 지정한 상품 이름으로 바뀌고 나머지는 바뀌지 않았다`.

그래서 이번에는 id가 아닌 `class를 부여`해보았는데 `세 상품이 모두 지정한 상품 이름으로 동일하게 바뀌었다`.

이를 통해 알게된 점은 다음과 같다.

> id 는 유일한 요소에 적용

> class 는 복수의 요소에 적용

그럼 id를 각각 따로 3개를 만들거 아니면 class를 부여해서 데이터바인딩을 해줘야할것 같은데 세 상품의 이름이 같으면 안되기때문에 이를 해결하는 방법은 `eq(인덱스)`를 사용하는 것이다.

```js
  $(".product-name").eq(0)html(products[0].title);
  $(".product-name").eq(1)html(products[1].title);
  $(".product-name").eq(2)html(products[2].title);
```

이것은 선택한 요소의 인덱스 번호에 해당하는 요소를 찾는 메서드로 위의 코드에서는 product-name이란 class 명을 가진 요소들 중 0번째, 1번째, 2번째를 찾아주기 때문에 세 상품의 이름을 모두 알맞게 바인딩해줄수 있다.

---

## 자바스크립트 정렬

**sort()** 라는 함수를 사용하면 데이터를 정렬할수 있다.
하지만 sort()는 **문자열 정렬** 이기 떄문에 숫자 데이터에 사용할 시 잘못된 정렬 결과를 출력한다.

따라서 `sort()를 사용할때는 무엇을 정렬할지에 따라 ()안에 적당한 함수를 작성`해주어야 한다.

따라서 숫자 정렬을 하고 싶으면 아래와 같이 작성해야 한다.

```js
array = [7, 3, 5, 2, 40];
// 오름차순 정렬
array.sort((a, b) => a - b);

// 내림차순 정렬
array.sort((a, b) => b - a);
```

**추가**

array=['b','c','a']가 있다고 할때 'a','b','c' 순으로 정렬하려면 array.sort()를 사용하면 되지만, 'c','b','a' 순으로 `역정렬`하려면 어떻게 해야할까?

```js
array.sort(); // a,b,c
array.reverse(); // c,b,a
```

### 객체 정렬

```js
var products = [
  { id: 0, price: 70000, title: "Blossom Dress" },
  { id: 1, price: 50000, title: "Springfield Shirt" },
  { id: 2, price: 60000, title: "Black Monastery" },
];

// 상품 가격 오름차순 정렬
$(".price-sort").click(function () {
  products.sort(function (a, b) {});
});
```

위와 같이 products 라는 오브젝트가 존재한다고 할때 상품 가격을 정렬하는 함수의 인자인 a,b는 products의 각 객체를 나타낸다.

즉 처음에 a는 `{ id: 0, price: 70000, title: "Blossom Dress" }`를 b는 `{ id: 1, price: 50000, title: "Springfield Shirt" }`를 가리키게 된다.

따라서 return a-b와 같이 객체끼리 사칙연산을 할수는 없기 때문에 아래 코드와 같이 a.price, b.price 이런식으로 작성해줘야 한다.

```js
// 상품 가격 오름차순 정렬
$(".price-sort").click(function () {
  products.sort(function (a, b) {
    return a.price - b.price;
  });
});
```

<br>

그럼 이제 배운것을 이용해 `가격순 정렬`이라는 버튼을 만들어 진열된 상품들이 가격순으로 정렬되도록 해보자.

```js
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
```

상품 데이터를 가격 순으로 정렬하고 정렬된 상품을 다시 화면에 출력해주는 코드를 작성하면 완성이다.

---

## filter, map

**filter()**

Array 자료형에서 원하는 데이터만 거를때 사용한다.

위의 sort()와는 다르게 원본 데이터를 변경하지 않는다.

```js
let array = [7, 3, 5, 2, 40];
// filter 한 결과는 새로운 변수를 만들어 담아줘야 한다.
let newArray = array.filter(function (a) {
  return a < 4; // [3,2]
});
```

쇼핑몰 시스템을 예로 들면 3만원 이하의 상품들만을 보여주고 싶은 경우 등에 사용할수 있을것 같다.

<br>

**map()**

기존 데이터에 새로운 작업을 반복해 조작된 새로운 데이터를 만들어야할때 사용한다.

```js
let array = [7, 3, 5, 2, 40];
// map한 결과도 새로운 변수를 만들어 담아줘야 한다.
let newArray = array.map(function (a) {
  return a * 2; // [14,6,10,4,80]
});
```

<br>

### 가나다순 정렬 버튼과 기능 구현

```js
// 상품 가나다순 정렬
$("#btn3").click(function () {
  // 1️⃣
  products.sort((a, b) => {
    if (a.title < b.title == true) {
      return -1;
    } else {
      return 1;
    }
  });
  // 2️⃣
  products.forEach((product) => {
    const id = product.id;
    $(".product-name").eq(id).html(products[id].title);
    $(".product-price").eq(id).html(`가격: ${products[id].price}`);
  });
});
```

1️⃣ 자바스크립트에서는 문자 2개를 부등호로 비교하는것이 가능하다. 즉, 'ㄱ'<'ㄴ'의 경우 true를 반환한다. 따라서 a객체의 title과 b객체의 title을 비교해 true가 되는 경우 -1을 반환하도록해서 더 나중에 와야할 문자열 b를 오른쪽으로 보내도록 구현한 것이다. (-를 반환하면 해당 값을 오른쪽으로 보내는 성질을 가진 sort()함수의 동작을 이용한 것이다.)

2️⃣ 1번을 통해 정렬한 상품 데이터를 출력하는 코드이다.

<br>

### 6만원이하 필터링 버튼과 기능 구현

```js
// 6만원 이하만 보기
$("#btn4").click(function () {
  // 1️⃣
  $("#card-group1").hide();
  $("#card-group2").show();
  // 2️⃣
  const newProducts = products.filter((a) => {
    return a.price <= 60000;
  });
  // 3️⃣
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
```

다른 부분보다 이 기능을 구현하는 부분에서 조금 많은 시간을 투자했다.
많은 시간을 투자하게 된 이유는 '6만원 이하'라는 조건에 알맞는 상품만 필터링해서 보여주고 조건에 부합하지 않는 상품들은 숨겨야 하는데 원래 있던 상품들중에 조건에 부합하는 상품만 남기고 부합하지 않는 상품은 어떻게 삭제해야할지 생각이 떠오르지 않았기 때문이다. 결국 나는 아래와 같은 방법을 통해 문제를 해결했다.

1️⃣ .card-group2라는 컨테이너를 새로 만들어두고 6만원 이하 상품만 보기라는 버튼을 누르면 기존에 있던 .card-group1은 숨기고 조건에 부합하는 상품만 추가해서 보여줄 .card-group2는 보여지도록 했다.

2️⃣ filter() 함수를 이용해 price가 6만원 이하인 상품들만 골라 다시 새로운 newProducts 배열을 만들어주었다.

3️⃣ .card-group2에 조건에 부합하는 상품 데이터들만 새로 추가해 보여주려고 코드를 작성했는데 이전에 추가되었던 데이터가 삭제되지 않고 계속 남아있어 6만원 이하만 보기 버튼을 누를때마다 계속 새로운 데이터가 추가되어 같은 상품이 2개, 4개, 6개...로 늘어나게 되는 버그가 발생했다. 따라서 이를 해결하기 위해 empty() 함수를 이용해 card-group2에 이미 존재하는 요소가 있는지 확인한 후 비어있다면 조건에 부합하는 요소를 추가해 보여줄수 있도록 조건을 걸어주었다.

**결과 이미지**

1. 가격 낮은순 정렬

<image src="./images/cheapest.png" style="margin:auto">

2. 가격 높은순 정렬

<image src="./images/expensive.png" style="margin:auto">

3. 가나다순 정렬

<image src="./images/alphabet.png" style="margin:auto">

4. 6만원 이하만 보기

<image src="./images/filter.png" style="margin:auto">

<br>

**깨달은점**

데이터의 갯수가 엄청 많아지거나 수시로 변경될수 있으므로 하드코딩해서 HTML 만들어두고 바꾸는것보다는 그때그때 동적으로 HTML을 생성해주는 방법이 더 확장성있고 좋은 코딩방법인것 같다.

---
