import React, { Component } from 'react';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard'
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
// state 의 변화가 감지될 때마다 render() 함수 실행 
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
