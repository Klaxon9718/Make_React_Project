import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

export default App;

/*
App.js
-App이라는 Component가 구현되어 있다. App은 class이며 Component를 상속받는다.
-App Component를 사용하면 <div>Hello World!</div> HTML 태그를 렌더링 하게 된다.

[Component란]
Componet는 너무 길고 복잡한 HTML 코드를 모듈화 할 수 있도록 만들어주는 최소 단위를 말한다.
우리는 Hello World!를 띄우는 간단한 예제를 통해 3줄짜리 <div> 태그를 <App />이라는 하나의 Component로 바꾸는 간단한 일을 했다.

*/