import React, { Component } from 'react';
import Subject from './components/Subject';
import Content from './components/Content';
import Option from './components/Option';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      subject: { title: 'WEB - STATE', sub: 'Hello React World - State !' },
      content: { content: 'Content Sample' },
      elements: [
        { id: 1, title: 'HTML', description: 'HTML is for information.' },
        { id: 2, title: 'CSS', description: 'CSS is for design.' },
        { id: 3, title: 'Javascript',description: 'JavaScript is for interactive.' }
      ]
      
    }
  }

  render() {
    return (
      <div className="App">
        <Subject title={ this.state.subject.title } content={ this.state.subject.sub }></Subject>
        <Option data={ this.state.elements }></Option>
        <Content content={ this.state.content.content }></Content>
      </div>
    );
  }
}

export default App;
