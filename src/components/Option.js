import React, { Component } from 'react';

class Option extends Component {
    render() {
        let lists = [];
        let data = this.props.data;
        let i = 0;
        while(i < data.length) {
            lists.push(<li><a href={ "/content/" + data[i].id }>{ data[i].title }</a></li>);
            i++;
        }
      return (
        <nav>
            <ul>
                { lists }
            </ul>
        </nav>
      );
    }
  }
  
  export default Option;