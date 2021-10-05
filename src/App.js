import React, { Component } from 'react';
import Subject from './components/Subject';
import './App.css';

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
