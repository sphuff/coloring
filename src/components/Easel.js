import React, {Component} from 'react';
import './Easel.css';
import uuid from 'uuid';

class Easel extends Component {

    constructor(props) {
        super(props);
        this.context = null;

        this.currentRecord = null;
        this.currentId = null;
        this.currentPath = []
        this.allPaths = [];

        var record = this.props.deepstreamRecord;
        record.whenReady(record => {
            console.log('record ready');
            record.subscribe(this.props.changeContextLocally, true);
        });
    }
    
    getXPos(clientX) {
        const dist = this.canvasBounds.left - this.easelBounds.left;
        console.log(dist);
        return clientX - dist;
    }

    getYPos(clientY) {
        const dist = this.canvasBounds.top - this.easelBounds.top;
        console.log(dist);
        return clientY - dist;
    }

    touchStart(event) {
        console.log('Touch');
        this.props.resetTimer();
        const xPos = this.getXPos(event.touches[0].clientX);
        const yPos = this.getYPos(event.touches[0].clientY);

        const id = uuid();
        this.currentPath = [];
        this.currentPath.push({
            x : xPos,
            y : yPos,
            color : this.props.selectedColor,
            lineWidth : this.props.lineWidth
        });
        this.currentId = id;
        if (!this.props.shouldOptimize) {
            this.props.deepstreamRecord.set(id, this.currentPath);
        }
    }

    touchMove(event) {
        const xPos = this.getXPos(event.touches[0].clientX);
        const yPos = this.getYPos(event.touches[0].clientY);
        this.currentPath.push({
            x : xPos,
            y : yPos,
            color : this.props.selectedColor,
            lineWidth : this.props.lineWidth
        });
        if (!this.props.shouldOptimize) {
            this.props.deepstreamRecord.set(this.currentId, this.currentPath);
        }
    }

    touchEnd(event) {
        console.log('End');
        if (this.props.shouldOptimize) {
            this.props.deepstreamRecord.set(this.currentId, this.currentPath);
        }
    }

    componentDidMount() {
        console.log('easel mount');
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        this.context = ctx;
        this.canvasBounds = c.getBoundingClientRect();
        this.easelBounds = document.getElementById('easel').getBoundingClientRect();

        if (this.props.currentCanvasImagePath) {
            var img = new Image();
            img.src = this.props.currentCanvasImagePath;
            
            img.onload = function() {
                ctx.drawImage(img, 0, 200);
            }
        }

        this.props.setContext(ctx);
    }

    render() {
        console.log('easel render');
        return (
            <div id="easel" onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)} onTouchMove={this.touchMove.bind(this)}>
                <canvas id="canvas" width="1080px" height="1536px"></canvas>
            </div>
        )
    }
}

export default Easel;