import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ColorWheel from './ColorWheelv2';
import Easel from './Easel';
import UserBlob from './UserBlob';
import ColorGrid from './ColorGrid';
import WidthPicker from './WidthPicker';

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
      currentImgPath: './img/floral-1801489.svg',
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
    // this.state.timer = null;
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

  render() {
    var colors = ['red', 'pink', 'yellow', 'orange', 'cyan', 'blue', 'palegreen', 'grey', 'lavendar', 'crimson', 'navy', 'darkgreen'];
    return (
        <div>
          {/* <UserBlob numUsers={this.state.numUsers} /> */}
          <div className="top-container">
            <Easel selectedColor={this.state.selectedColor} lineWidth={this.state.lineWidth} currentImgPath={this.state.currentImgPath} deepstreamRecord={this.state.deepstreamRecord} resetTimer={this.resetTimer.bind(this)}/>
            <UserBlob numUsers={this.state.numUsers} />
          </div>
          <div className="bottom-container">
            {/* <ColorWheel changeColor={this.changeColor.bind(this)} numColors={12} colors={colors}/> */}
            <ColorGrid changeColor={this.changeColor.bind(this)}/>
            <WidthPicker changeLineWidth={this.changeLineWidth.bind(this)}/>
            {/* <UserBlob numUsers={this.state.numUsers} /> */}
          </div>
        </div>
    )
  }
}

export default App;
