import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import './SidebarItem.css';

export default function SidebarItem(props) {
  const { children } = props;

  return (
    <ListGroupItem
      id="sidebar"
      style={styles.item}
      onClick={() => alert('Clicked')}
      className="bg-transparent item">
      {children}
    </ListGroupItem>
  );
}

const styles = {
  item: {},
};
