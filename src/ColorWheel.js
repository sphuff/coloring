import React, { Component } from 'react';
import './ColorWheel.css';
import Color from './Color';

const numColors = 3;
const colorWidth = 80;
const wheelWidth = 300;
var circle = null;
var isRendered = false;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getAnimateCoord(index) {
    console.log(index);
    var coord = {
        x : 0,
        y : 0
    }

    if (index == 0) {
        coord.x = 130;
        coord.y = 0;
    } else if (index == 1) {
        coord.x = 0;
        coord.y = 130;
    } else if (index == 2) {
        coord.x = 260;
        coord.y = 130;
    }

    return coord;
}

const colorArr = ['#72C8B4', '#F15F64', '#FFCD2B'];
  

const wheelPos = {
    x : 100,
    y : 100
};

class ColorWheel extends Component {
    constructor(props) {
        super(props);
        this.colors = [];
    }

    getColor(index, currentCoord) {
        console.log('get color');
        const animateCoord = getAnimateCoord(index);
        return (
            <Color 
                key={index}
                currentCoord={currentCoord}
                animateCoord={animateCoord}
                index={index}
                color={colorArr[index]}
                ref={(child) => {this.colors[index] = child; }}
                onUpdate={this.props.changeColor.bind(this)}
            />
        )
    }

    generateColors() {
        var colors = [];
        for (var index = 0; index < numColors; index++) {
            const x = wheelWidth/2 - colorWidth/2;
            const y = wheelWidth/2 - colorWidth/2;
            const currentCoord = {
                x : x,
                y : y
            }
            colors.push(this.getColor(index, currentCoord));
        }
        this.setState({
            colors: colors
        });
    }

    wheelClicked(event) {
        console.log('wheel clicked');
        console.log(event.clientX);
        console.log(event.clientY);
        console.log(this.colors);
        this.colors.forEach(function(element) {
            console.log(element);
            element.animate();
        }, this);
    }

    componentDidMount() {
        var d = document.getElementById('wheel');
        d.style.position = "relative";
        d.style.left = wheelPos.x + 'px';
        d.style.top = wheelPos.y + 'px';
        d.style.width = wheelWidth + 'px';
        d.style.height = wheelWidth + 'px';
        d.style.borderRadius = wheelWidth/2 + 'px';
    }

    componentWillMount() {
        this.generateColors();
    }

    render() {
        console.log('render');
        return (
            <div id="wheel" onClick={this.wheelClicked.bind(this)}>
                {this.state.colors}
            </div>
        )
    }
}

export default ColorWheel;