import React, { Component } from 'react';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard'
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './reduxSample/screens/Counter';
import Todo from './reduxSample/screens/Todo';

class App extends Component {
// state 의 변화가 감지될 때마다 render() 함수 실행 
  render() {
    /** 모달이 열렸을 때, 화면을 바라보고 있는 사용자가 모달창이 아닌 다른 컴포넌트를 바라보지 않도록 하기 위해
    #root 엘리먼트를 숨김 **/
    Modal.setAppElement('#root');

    return (
      <div className="App">
        {/* <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </BrowserRouter> */}

        <Counter />
        <hr />
        <Todo />
      </div>
    );
  }
}

export default App;
