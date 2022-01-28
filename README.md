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
