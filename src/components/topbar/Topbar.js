import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { FaSatelliteDish, FaUser } from 'react-icons/fa';
import TopbarButton from './TopbarButton';

export default class Topbar extends Component {
  render() {
    return (
      <Nav className="d-flex flex-row justify-content-between shadow p-3">
        <TopbarButton>
          <small className="text-muted">channel </small>
          <b>Dupaa</b>
          <FaSatelliteDish />
        </TopbarButton>
        <TopbarButton>
          <small className="text-muted">user </small>
          <b>bartek.fryz@gmail.com </b>
          <FaUser />
        </TopbarButton>
      </Nav>
    );
  }
}
