import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import '@toast-ui/editor/dist/toastui-editor.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main" style={{ maxWidth: 1000 }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
