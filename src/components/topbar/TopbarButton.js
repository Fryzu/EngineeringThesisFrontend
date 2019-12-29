import React, { Component } from 'react';

export default class TopbarButton extends Component {
  render() {
    const { children } = this.props;

    return <h5 className="">{children}</h5>;
  }
}
