import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import './SidebarItem.css';

export default function SidebarItem(props) {
  const { children, disabled, onClick } = props;

  const dynamicClass = disabled ? 'bg-primary item' : 'bg-transparent item';

  const clickHandler = disabled ? null : onClick;

  return (
    <ListGroupItem
      style={itemStyle}
      id="sidebar"
      onClick={clickHandler}
      className={dynamicClass}>
      {children}
    </ListGroupItem>
  );
}

const itemStyle = {
  cursor: 'pointer',
};
