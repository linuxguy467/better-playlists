import React, { Component } from 'react';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
};

class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", marginTop: '3rem', display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input type="text" style={{margin: '1.2rem'}}/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img src="" alt=""/>
        <h3>Playlist Name</h3>
        <ul style={{marginTop: '1.5rem', listStyle: 'none'}}>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
          <li>Song 5</li>
        </ul>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
