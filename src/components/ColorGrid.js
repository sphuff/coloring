import React, {Component} from 'react';
import './ColorGrid.css';
import Color from './Color';
import {getRandomColor} from '../utils';

class ColorGrid extends Component {
    constructor(props) {
        super(props);
        this.colors = [];
        for (var index = 0; index < 12; index++) {
            this.colors[index] = getRandomColor();
        }
    }
    render() {
        console.log('grid render');
        
        return (
            <div className="color-container">
                <Color color={this.colors[0]} index={0} key={0} changeColor={this.props.changeColor}/>
                <Color color={this.colors[1]} index={1} key={1} changeColor={this.props.changeColor}/>
                <Color color={this.colors[2]} index={2} key={2} changeColor={this.props.changeColor}/>
                <Color color={this.colors[3]} index={3} key={3} changeColor={this.props.changeColor}/>
                <Color color={this.colors[4]} index={4} key={4} changeColor={this.props.changeColor}/>
                <Color color={this.colors[5]} index={5} key={5} changeColor={this.props.changeColor}/>
                <Color color={this.colors[6]} index={6} key={6} changeColor={this.props.changeColor}/>
                <Color color={this.colors[7]} index={7} key={7} changeColor={this.props.changeColor}/>
                <Color color={this.colors[8]} index={8} key={8} changeColor={this.props.changeColor}/>
                <Color color={this.colors[9]} index={9} key={9} changeColor={this.props.changeColor}/>
                <Color color={this.colors[10]} index={10} key={10}  changeColor={this.props.changeColor}/>
                <Color color={this.colors[11]} index={11} key={11}  changeColor={this.props.changeColor}/>
            </div>
        )
    }
}

export default ColorGrid;