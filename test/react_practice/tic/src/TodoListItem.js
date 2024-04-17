import { Component } from "react";

export default class TodoListItem extends Component{
    checkItem(){
        const checkComponent = document.querySelector("#todo-item" + this.props.id);
        if(checkComponent.style.cssText){
            checkComponent.style.cssText = 0;
        }else{
            checkComponent.style.cssText = "text-decoration: line-through";
        }
    }

    render(){
        return (
                <li id={"todo-item" + this.props.id}>
                    <input type="button" value="✅" onClick={() => {this.checkItem()}}/>
                    {this.props.text}
                    <input type="button" value="X" onClick={() => {this.props.delete(this.props.id)}}/>
                </li>
        );
    }
}