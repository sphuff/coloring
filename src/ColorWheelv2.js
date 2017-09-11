import React, {Component} from 'react';
import './ColorWheelv2.css';
import $ from 'jquery';
import {getRandomColor} from './utils';

class ColorWheelv2 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const degreeRotationPerColor = 360/this.props.numColors;
        var degreePosition = -degreeRotationPerColor;
        var zIndex = this.props.numColors;
        console.log(this.props.colors)
        for (var index = 0; index < 1; index++) {
            const color = this.props.colors[index];
            
            degreePosition += degreeRotationPerColor;
            this.createSector(degreePosition, color, zIndex--);
        }
        // const color = this.props.colors[0];
        // this.createPieces(color);
    }

    createPieces(color) {
        var piece = document.createElement('span');
        piece.className = 'piece';
        piece.style.backgroundColor = color;

        document.getElementById('wheel').appendChild(piece);
    }

    createSector(rotateDegree, color, zIndex) {
        // make triangle
        const sectorWidth = this.props.wheelWidth;
        var sector = document.createElement('div');
        sector.className = 'sector';
        // flip triangle
        console.log('color: ' + color);
        var angle = rotateDegree + 90;
        console.log('rotate: ' + angle);
        
        sector.style.transform = 'rotate(' + 90 + 'deg)';
        // sector.style.display = 'inline-block';
        sector.style.borderBottom = 'solid 200px ' + color; 

        
        sector.style.zIndex = zIndex;
        // if (zIndex == 12) {
        //     sector.classList.add('last-sector');
        //     sector.style.transform = 'rotate(' + rotateDegree + 'deg)';
        //     sector.style.zIndex = zIndex;
        // }
        // // // transform around center bottom rather than center of rectangle
        sector.style.transformOrigin = 'top center';
        // console.log(sector);
        document.getElementById('wheel').appendChild(sector);
    }
    render() {
        return (
            <div id="wheel">
                {/* <div id="center"></div> */}
            </div>
        )
    }
}

export default ColorWheelv2;