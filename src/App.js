import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{ this.props.title }</h1>
        { this.props.content }
      </header>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject title="WEB" content="Hello React World ! "></Subject>
      </div>
    );
  }
}

export default App;
