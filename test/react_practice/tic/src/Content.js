import { Component } from "react";
import TodoList from "./TodoList";
import TodoListItem from "./TodoListItem";

export default class Content extends Component{
    constructor(props){
        super(props);

        this.state = {
            itemNum: 0,
            items: []
        };
    }

    deleteItem(num){
        const selected = document.querySelector('#todo-item' + num);
        if(selected){
            selected.remove();
        }
    }

    addItem(){
        const inputText = document.querySelector('#inputText');
        if(inputText.value){
            const tempArr = [...this.state.items];
            tempArr.push(<TodoListItem
                            id={this.state.itemNum++}
                            text={inputText.value}
                            delete={(num)=>{this.deleteItem(num)}}/>);
            this.setState({
                items: tempArr
            })
            inputText.value=""
        }
    }

    render(){
        return(
            <div>
                <input autoComplete="off" id="inputText" type="text" placeholder="입력해보자"/>
                <input type="button" value="↩"
                        onClick={() => {this.addItem()}}/>
                <TodoList items={this.state.items}/>
            </div>
        );
    }
}

/**
 [배열 복사]
const tempArr = [...this.state.items];
this.state.items에 바로 push하면 안되고, 배열을 복사([...배열])한후 복사한 배열에 push
그리고 나서 복사한 배열을 setState로 변경
 */