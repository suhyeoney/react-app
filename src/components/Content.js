import React, { Component } from 'react';

class Content extends Component {
    render() {
      return (
        <div>
          { this.props.content }
        </div>
      );
    }
  }
  
  export default Content;