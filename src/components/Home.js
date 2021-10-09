import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

class Home extends Component {
    state = {
        username: null
    };
    /** render() 함수를 통해 UI 가 다 그려진 다음에 추가로 처리해야 하거나 네트워크에서 무언가 
    내려받아 어떤 일을 처리해야 하는 로직이 들어감
    constructor > componentWillMount > render > componentDidMount 순으로 호출 **/
    componentDidMount() {
        fetch('/api/getUsername')
        .then(res => res.json())
        .then(user => this.setState({
          username: user.username
        }));
    }

    render() {
        const username = this.state;
        return (
        <div>
            <header className="App-header"> 
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/dashboard">
                    <h1 className="App-title">Welcome to Rail Management</h1>
                </Link>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <div>
                {username ? <h1>{`Hello ~ ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
            </div>
        </div>
      );
    }
  }
  
  export default Home;