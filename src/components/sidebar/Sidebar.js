import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSatelliteDish, FaUser } from 'react-icons/fa';
import { ListGroup } from 'react-bootstrap';
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';

class Sidebar extends Component {
  render() {
    const { channels, users } = this.props;

    return (
      <ListGroup className="bg-transparent">
        <SidebarHeader>Channels</SidebarHeader>
        {channels.length > 0 ? (
          channels.map(channel => {
            return <SidebarItem key={channel}>{channel}</SidebarItem>;
          })
        ) : (
          <SidebarItem>
            <FaSatelliteDish /> No Channels
          </SidebarItem>
        )}
        <SidebarHeader>Users</SidebarHeader>
        {users.length > 0 ? (
          users.map(user => {
            return <SidebarItem key={user}>{user}</SidebarItem>;
          })
        ) : (
          <SidebarItem>
            <FaUser /> No Users
          </SidebarItem>
        )}
      </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.server.channels,
    users: state.server.users,
  };
}

export default connect(mapStateToProps)(Sidebar);
