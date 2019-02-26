import React, { Component } from 'react';

class LoadingBadge extends Component {
  render() {
    return (
      <span>{this.props.text}</span>
    );
  };
};

export default LoadingBadge;
