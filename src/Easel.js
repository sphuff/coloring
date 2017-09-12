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

    // changeContextLocally(context) {
    //     console.log('change context');
    //    for (var pathID in context) {
    //        if(this.allPaths[pathID] != null && (this.allPaths[pathID].length == context[pathID].length)) {
    //            // already have all the path information
    //             continue;
    //        }
    //        this.context.beginPath();
    //        this.context.strokeStyle = context[pathID][0].color;
    //        this.context.lineWidth = context[pathID][0].lineWidth;
    //        context[pathID].forEach(function(position) {
    //             this.context.lineTo(position.x, position.y);
    //             this.context.stroke();
    //         }, this);
    //    }
    //    this.allPaths = context;
    // }
    
    touchStart(event) {
        console.log('Touch');
        this.props.resetTimer();
        const xPos = event.touches[0].clientX;
        const yPos = event.touches[0].clientY;

        const id = uuid();
        this.currentPath = [];
        this.currentPath.push({
            x : xPos,
            y : yPos,
            color : this.props.selectedColor,
            lineWidth : this.props.lineWidth
        });
        this.currentId = id;
        this.props.deepstreamRecord.set(id, this.currentPath);
    }

    touchMove(event) {
        const xPos = event.touches[0].clientX;
        const yPos = event.touches[0].clientY;
        this.currentPath.push({
            x : xPos,
            y : yPos,
            color : this.props.selectedColor,
            lineWidth : this.props.lineWidth
        });
        this.props.deepstreamRecord.set(this.currentId, this.currentPath);
    }

    touchEnd(event) {
        console.log('End');
    }

    componentDidMount() {
        console.log('easel mount');
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        this.context = ctx;

        if (this.props.currentCanvasImagePath) {
            var img = new Image();
            img.src = this.props.currentCanvasImagePath;
            
            img.onload = function() {
                ctx.drawImage(img, 0, 200);
            }
        }

        this.props.changeContext(ctx);
    }

    // changeMode() {
    //     // add image
    //     if (this.props.currentCanvasImagePath) {
    //         var img = new Image();
    //         img.src = this.props.currentCanvasImagePath;
            
    //         img.onload = function() {
    //             this.context.drawImage(img, 0, 200);
    //         }
    //     } else /* remove image */ {
    //         var pathsArrCopy = [];
    //         for (var pathID in this.allPaths) {
    //             this.allPaths.forEach(function(position) {
    //                 pathsArrCopy[pathID].push(position);
    //             }, this);
    //         }
    //         this.allPaths = null;
    //         this.context.clearRect(0, 0, this.context.width, this.context.height);
    //         this.changeContextLocally(pathsArrCopy);
    //     }
    // }

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