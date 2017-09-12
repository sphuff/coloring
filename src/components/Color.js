import React, { Component } from 'react';
import './Color.css';
import $ from 'jquery';

var timeout = null;
const colorWidth = 80;

class Color extends Component {
    constructor(props) {
        super(props);
        this.elemId = "color" + this.props.index;
    }

    colorClicked() {
        console.log('color: ' + this.props.color);
        console.log('index: ' + this.props.index);
        
        this.props.changeColor(this.props.color);
    }
    
    componentDidMount() {
        console.log('color mount');
        document.getElementById(this.elemId).style.backgroundColor = this.props.color;
    }
    render() {
        return (
            <div className="color" id={this.elemId} onClick={this.colorClicked.bind(this)}></div>
        )
    }
}

export default Color;