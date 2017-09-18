import React, { Component } from 'react';
import './App.css';
import Easel from './components/Easel';
import UserBlob from './components/UserBlob';
import ColorGrid from './components/ColorGrid';
import WidthPicker from './components/WidthPicker';

const deepstream = require( 'deepstream.io-client-js' );
const TIMER_PERIOD = 30000;

class App extends Component {
  constructor(props) {
    super(props);
    const dsClient = deepstream('wss://013.deepstreamhub.com?apiKey=84f918d5-be4b-4fd2-a08a-ed3aa8f96201');
    dsClient.login();
    const record = dsClient.record.getRecord('test/easel');

    var timer = setTimeout(this.logoutUser.bind(this),TIMER_PERIOD)
    var state = {
      selectedColor: "#72C8B4",
      lineWidth: 5,
      paths: [],
      currentCanvasImagePath: './img/floral-1801489.svg',
      modeImagePath: './img/pen.svg',
      isColoring: true,
      deepstreamRecord: record,
      dsClient: dsClient,
      context: {},
      timer: timer,
      numUsers: 1,
      userIsLoggedOut : false
    };
    this.state = state;
    const unmountRecord = dsClient.record.getRecord('test/unmount');
    unmountRecord.whenReady(record => {
      console.log('record ready');
      this.loginUser();
      record.subscribe(this.changeNumUsers.bind(this), true);
    });

    console.log('constructor done');
  }

  changeNumUsers(record) {
    console.log(record);
    const num = record.userCount;
    this.setState({
      'numUsers' : num
    });
  }

  changeLineWidth(lineWidth) {
    this.setState({
      lineWidth: lineWidth
    });
  }

  componentDidMount() {
    console.log('mounted app');
  }

  loginUser() {
    console.log('login');
    var unmountRecord = this.state.dsClient.record.getRecord('test/unmount');
    var userCount = unmountRecord.get('userCount');
    console.log('count: ' + userCount);
    this.state.userIsLoggedOut = false;
    userCount = userCount == null ? 0 : this.state.numUsers;
    unmountRecord.set({
      'userCount': userCount + 1
    });
  }

  logoutUser() {
    console.log('logout');
    var unmountRecord = this.state.dsClient.record.getRecord('test/unmount');
    var userCount = unmountRecord.get('userCount');
    unmountRecord.set({
      'userCount': userCount - 1
    });
    this.state.userIsLoggedOut = true;
    clearTimeout(this.state.timer);
    
    this.setState({
      timer : null
    });
  }

  resetTimer() {
    console.log('reset timer');
    clearTimeout(this.state.timer);
    // if user is currently logged out, we need to increment user count
    if (this.state.userIsLoggedOut) {
      this.loginUser();
    }
    console.log('making new timer');
    this.state.timer = null;
    this.setState({
      timer : setTimeout(this.logoutUser.bind(this),TIMER_PERIOD)
    });
  }

  changeColor(color) {
    this.setState({
        selectedColor: color
    });
  }

  changeContextLocally(paths) {
    console.log('change context');
    for (var pathID in paths) {
        if(this.state.paths[pathID] != null && (this.state.paths[pathID].length == paths[pathID].length)) {
            // already have all the path information
              continue;
        }
        console.log('new path');
        this.state.context.beginPath();
        this.state.context.strokeStyle = paths[pathID][0].color;
        this.state.context.lineWidth = paths[pathID][0].lineWidth;
        paths[pathID].forEach(function(position) {
              console.log('new line');
              this.state.context.lineTo(position.x, position.y);
              this.state.context.stroke();
          }, this);
    }
    this.setState({
      paths: paths
    });
  }
  
  setContext(context) {
    this.setState({
      context: context
    });
  }

  changeMode() {
    const newCanvasImagePath = this.state.isColoring ? null : './img/floral-1801489.svg';
    const newModeImagePath = this.state.isColoring ?  './img/brush.svg' : './img/pen.svg';
    var self = this;

    // draw image
    if (newCanvasImagePath) {
      console.log('draw image');
      var img = new Image();
      img.src = newCanvasImagePath;
      console.log(img);
      
      img.onload = function() {
          self.state.context.drawImage(img, 0, 200);
      }
    } else /* remove image */ {
      console.log('remove image');
      this.state.context.clearRect(0, 0, this.state.context.canvas.width, this.state.context.canvas.height);
      
    }
    var pathsArrCopy = {};
    for (var pathID in this.state.paths) {
        console.log(pathID);
        pathsArrCopy[pathID] = [];
        this.state.paths[pathID].forEach(function(position) {
            pathsArrCopy[pathID].push(position);
        }, this);
    }
    this.state.paths = {};
    this.changeContextLocally(pathsArrCopy);

    var record = this.state.isColoring ? this.state.dsClient.record.getRecord('test/collab') : this.state.dsClient.record.getRecord('test/easel');
    this.state.context.clearRect(0, 0, this.state.context.canvas.width, this.state.context.canvas.height);
    
    this.setState({
      isColoring: !this.state.isColoring,
      currentCanvasImagePath: newCanvasImagePath,
      modeImagePath: newModeImagePath,
      deepstreamRecord: record,
      paths: []
    });
    record.whenReady(record => {
      console.log('record ready');
      record.subscribe(this.changeContextLocally.bind(self), true);
    });
  }

  render() {
    const modeButton = (
      <button id="mode-button" onClick={this.changeMode.bind(this)}>
        <img id="svg" src={this.state.modeImagePath} style={{fill:'#A6E4E7'}}/>
      </button>
    );
    console.log(modeButton);
    return (
        <div>
          <div className="top-container">
            {modeButton}
            <Easel selectedColor={this.state.selectedColor} setContext={this.setContext.bind(this)} lineWidth={this.state.lineWidth} currentCanvasImagePath={this.state.currentCanvasImagePath} deepstreamRecord={this.state.deepstreamRecord} resetTimer={this.resetTimer.bind(this)} changeContextLocally={this.changeContextLocally.bind(this)} shouldOptimize={false}/>
            <UserBlob numUsers={this.state.numUsers} />
          </div>
          <div className="bottom-container">
            <ColorGrid changeColor={this.changeColor.bind(this)}/>
            <WidthPicker changeLineWidth={this.changeLineWidth.bind(this)}/>
          </div>
        </div>
    )
  }
}

export default App;
