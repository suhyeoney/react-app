import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      // subject: { title: 'WEB - STATE', sub: 'Hello React World - State !' },
      // content: { content: 'Content Sample' },
      // elements: [
      //   { key: 'html', id: 1, title: 'HTML', description: 'HTML is for information.' },
      //   { key: 'css', id: 2, title: 'CSS', description: 'CSS is for design.' },
      //   { key: 'javascript', id: 3, title: 'Javascript',description: 'JavaScript is for interactive.' }
      // ]
      username: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
}

  render() {
    const {username} = this.state;
    return (
      <div className="App">
        {/* <Subject title={ this.state.subject.title } content={ this.state.subject.sub }></Subject>
        <Option data={ this.state.elements }></Option>
        <Content content={ this.state.content.content }></Content> */}
        <header className='App-header'>
          {username ? `Hello ${username}` : 'Hello World'}
        </header>
      </div>
    );
  }
}

export default App;
