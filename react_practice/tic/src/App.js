import { Component } from "react";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example_state: "이건 Content의 state텍스트 입니다."
    };
  }

  render() {
    return (
      <div> 
        {this.state.example_state}
        <input type="button" value="test 버튼" 
                onClick={() => {this.setState({example_state:"변경된 state 텍스트입니다."}) }}/>
      </div>
    );
  }
}


class Title extends Component {
  render() {
    return (
      <div> {this.props.text123} </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Title text123="App에서 Title로 전달하는 text입니다."/>
        <Content example_props="App에서 Content로 전달하는 Text입니다."/>
      </div>
    );
  }
}

export default App;

/*
[props 사용]
상위 컴포넌트 App에서 
<tag    전달할 props 이름   전달할 데이터/>
<Title text123="App에서 Title로 전달하는 text입니다."/>

하위 컴포넌트 Title에서
      {this.props.전달받은 props 이름}
<div> {this.props.text123} </div>
으로 prop을 사용
-div 태그 안에서의 자바스크립트 코드는 {}로 감싼다

[state 사용]
1. 선언 : 
  Component의 생성자 constructor에서 선언 및 초기화를 해줬다. 추가하고 싶은 state 변수가 더 있다면 example_state변수  , 뒤에 더 추가하면 된다.
2. 사용 :
  사용방법은 props와 마찬가지로 태그 안에서 사용하려면 자바스크립 코드는 { } 로 감싸서 사용하면 된다.
3. 수정 :
  state는 수정하려면 this.state.example_state='값' 이런 식으로 하면 안 되고,
  꼭 setState 함수를 사용해야 한다.
  setState 함수를 사용하지 않으면 렌더링이 되지 않는다.
  
[참고 및 출처]
https://jaegeun.tistory.com/58
*/