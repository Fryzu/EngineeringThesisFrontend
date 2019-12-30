import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { FaSatelliteDish, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import TopbarButton from './TopbarButton';

class Topbar extends Component {
  onSubmit = () => {
    alert('submit');
  };

  render() {
    const { userName, channelName } = this.props;

    return (
      <Nav className="d-flex flex-row justify-content-between shadow p-3">
        {channelName && (
          <TopbarButton>
            <small className="text-muted">channel </small>
            <b>{channelName} </b>
            <FaSatelliteDish />
          </TopbarButton>
        )}
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
    channelName: state.user.channelName,
  };
}

export default connect(mapStateToProps)(Topbar);
