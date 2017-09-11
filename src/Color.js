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

    animate() {
        $( "#"+this.elemId ).animate({
            top: this.props.animateCoord.y,
            left: this.props.animateCoord.x
        }, 1000, function() {
            console.log('done');
        });
    }

    colorClicked() {
        this.props.onUpdate(this.props.color);
    }
    
    componentDidMount() {
        console.log('color mount');
        var d = document.getElementById(this.elemId);
        d.style.position = "absolute";
        d.style.left = this.props.currentCoord.x + 'px';
        d.style.top = this.props.currentCoord.y + 'px';
        d.style.backgroundColor = this.props.color;
        d.style.height = colorWidth + 'px';
        d.style.width = colorWidth + 'px';
        d.style.borderRadius = colorWidth/2 + 'px';
    }
    render() {
        return (
            <div className="color" id={this.elemId} onClick={this.colorClicked.bind(this)}></div>
        )
    }
}

export default Color;