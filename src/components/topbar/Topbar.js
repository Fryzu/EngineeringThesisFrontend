import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { FaSatelliteDish, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import TopbarButton from './TopbarButton';

class Topbar extends Component {
  render() {
    const { userName } = this.props;

    return (
      <Nav className="d-flex flex-row justify-content-between shadow p-3">
        <TopbarButton>
          <small className="text-muted">channel </small>
          <b>Dupaa</b>
          <FaSatelliteDish />
        </TopbarButton>
        <TopbarButton>
          <small className="text-muted">user </small>
          <b>{userName} </b>
          <FaUser />
        </TopbarButton>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
  };
}

export default connect(mapStateToProps)(Topbar);
