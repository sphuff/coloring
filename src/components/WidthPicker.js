import React, {Component} from 'react';
import './WidthPicker.css';

var self = null;
class WidthPicker extends Component {
    constructor(props) {
        super(props);
        self = this;
    }
    
    widthClicked() {
        const id = this;
        console.log(id);
        console.log(self);
        var lineWidth = null;
        if (id == 1) {
            lineWidth = 5;
        } else if (id == 2) {
            lineWidth = 8;
        } else if (id == 3) {
            lineWidth = 15;
        } else if (id == 4) {
            lineWidth = 20;
        }
        self.props.changeLineWidth(lineWidth);
    }
    render() {
        return (
            <div id="width-picker">
                <div className="width-container">
                    <div className="width" id="width1" onClick={this.widthClicked.bind(1)} ></div>
                    <div className="width" id="width2" onClick={this.widthClicked.bind(2)} ></div>
                </div>
                <div className="width-container">
                    <div className="width" id="width3" onClick={this.widthClicked.bind(3)}></div>
                    <div className="width" id="width4" onClick={this.widthClicked.bind(4)}></div>
                </div>
            </div>
        )
    }
}

export default WidthPicker;