import { Component } from "react";
import TodoList from "./TodoList";

export default class Content extends Component{
    constructor(props){
        super(props);

        this.state = {
            itemNum: 0,
            items: []
        };
    }

    render(){
        return(
            <div>
                <input autoComplete="off" id="inputText" type="text" placeholder="입력해보자"/>
                <input type="button" value="↩"></input>
                <TodoList items={this.state.items}/>
            </div>
        );
    }
}