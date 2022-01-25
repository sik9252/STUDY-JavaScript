# STUDY-javascript

자바스크립트에 대한 공부 기록

---

<a href="https://codingapple.com/">공부할때 수강한 인강</a>

웹 환경에서 JavaScript의 목적: HTML의 조작과 변경

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
