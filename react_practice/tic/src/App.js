import { Component } from "react";

class Content extends Component {
	render(){
		return (
				<div>{this.props.example_props}</div>
		);
	}
}

class Title extends Component{
	render() {
		return (
			<div>
				이건 Title
				<input type="button" value="event 버튼"
						onClick={() => {
							this.props.exampleEvent("Title에서 전달되는 Text");
						}}/>
			</div>
		)
	}
}

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			example_state: "App에서 전달하는 Text"
		}
	}
	
	setAppText(text){
		this.setState({
			example_state: text
		});
	}

	render(){
		return(
			<div>
				<Title exampleEvent={(text) => {this.setAppText(text)}}/>
				<Content example_props={this.state.example_state}/>
			</div>
		);
	}
}

export default App;

/*
[event 사용]
데이터 전달
상위 -> 하위 : props와 state이용
하위 -> 상위 : event 이용

[실행 순서]
1.App 생성자에서 emample_state: "App에서 전달하는 Text"가짐
2.App 내부의 render실행 -> Title과 Content출력 : Title의 "이건 Title" , button 과 Content의 {this.props.example_props} 문장 (""App에서 전달하는 Text"")이 실행 
3.onClick이벤트 발생, Title내부의 exampleEvent 실행
4.App 내부의 <Title exampleEvent={(text) ... 이 실행 > setAppText함수 실행, 인자로 text가 전달
 [데이터 수신]
	상위 Component에서는 하위 Component의 event가 발생했을 때 어떤 동작을 할지 정의해주면 된다.
	App Component에서 exampleEvent가 발생 시 setAppText라는 함수를 호출하게 했으며, 같이 전달되는 text를 받아서 같이 넘겨줬다.
5.example_state 상태 변경
6.App 내부의 Content가 실행된다.


	
[참고 및 출처]
https://jaegeun.tistory.com/58
*/