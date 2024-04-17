import { Component } from "react";

export default class TodoList extends Component{
    render(){
        return(
            <ul>{this.props.items}</ul>
        );
    }
}