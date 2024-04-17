import { Component } from "react";

export default class TitleBar extends Component{
    render() {
        return (
                <div>{this.props.text}</div>
        );
    }
}