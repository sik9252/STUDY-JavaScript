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

---
