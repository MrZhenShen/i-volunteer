import React, { Component } from 'react';

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'John Doe',
    };
  }

  render() {
    return (
      <div className="profile">
        <h1>Volunteer Page</h1>
        <p>Name: {this.state.name}</p>
      </div>
    );
  }
}

export default Volunteer;
