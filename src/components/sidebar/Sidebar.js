import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSatelliteDish, FaUser } from 'react-icons/fa';
import { ListGroup } from 'react-bootstrap';
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';
import { addMeToChannel } from '../../actions/user';

class Sidebar extends Component {
  channelOnClick = channelName => {
    const { addMeToChannelAction, channelOwner } = this.props;

    if (channelOwner) {
      alert('To join channel, you must first currently open channel.');
    } else {
      addMeToChannelAction(channelName);
    }
  };

  render() {
    const { channels, users, userName, channelName } = this.props;
    return (
      <ListGroup className="bg-transparent">
        <SidebarHeader>Channels</SidebarHeader>
        {channels.length > 0 ? (
          channels.map(channel => {
            return (
              <SidebarItem
                disabled={channel === channelName}
                onClick={() => this.channelOnClick(channel)}
                key={channel}>
                {channel}
              </SidebarItem>
            );
          })
        ) : (
          <SidebarItem>
            <FaSatelliteDish /> No Channels
          </SidebarItem>
        )}
        <SidebarHeader>Users</SidebarHeader>
        {users.length > 0 ? (
          users.map(user => {
            return (
              <SidebarItem disabled={userName === user} key={user}>
                {user}
              </SidebarItem>
            );
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
    userName: state.user.userName,
    channelOwner: state.user.channelOwner,
    channelName: state.user.channelName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMeToChannelAction: channelName => dispatch(addMeToChannel(channelName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
