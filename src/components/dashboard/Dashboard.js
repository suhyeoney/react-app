import React, { Component } from 'react';

class Dashboard extends Component {
    state = {
        trainList: null
    };

    componentDidMount() {
        fetch('/getAllData')
        .then(res => res.json())
        .then(list => this.setState({
            trainList: list
        }));
    }

    render() {
        console.log("state : " + this.state);
        const { list } = this.state;
        return (
        <div>
            {list}
        </div>
      );
    }
  }
  
  export default Dashboard;