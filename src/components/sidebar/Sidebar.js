import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';

export default class Sidebar extends Component {
  render() {
    return (
      <ListGroup className="bg-transparent">
        <SidebarHeader>Users</SidebarHeader>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarHeader>Channels</SidebarHeader>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
        <SidebarItem>dupa1</SidebarItem>
      </ListGroup>
    );
  }
}
