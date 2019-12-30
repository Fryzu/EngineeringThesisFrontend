import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import './SidebarItem.css';

export default function SidebarItem(props) {
  const { children, disabled } = props;

  const dynamicClass = disabled ? 'bg-primary item' : 'bg-transparent item';

  const onClick = disabled ? null : () => alert('Clicked');

  return (
    <ListGroupItem
      style={itemStyle}
      id="sidebar"
      onClick={onClick}
      className={dynamicClass}>
      {children}
    </ListGroupItem>
  );
}

const itemStyle = {
  cursor: 'pointer',
};
