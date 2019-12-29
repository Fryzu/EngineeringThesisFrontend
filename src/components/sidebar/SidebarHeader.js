import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default function SidebarHeader(props) {
  const { children } = props;
  return (
    <ListGroupItem className="bg-transparent text-muted">
      {children}
    </ListGroupItem>
  );
}
