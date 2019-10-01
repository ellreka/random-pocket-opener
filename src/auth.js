import React from 'react';
import './style.scss';
import { Button } from 'reactstrap';
import axios from 'axios';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async authenticationHandle() {
    console.log('authenticationHandle')
  }

  render() {
    return (
      <main className="login-Container d-flex flex-column justify-content-center align-items-center mt-5">
        <p className="lead">Pocketに保存されているアイテムをランダムに開きます。</p>
        <Button className="mt-5" variant="outline-secondary" onClick={() => this.authenticationHandle()}>Pocketと連携</Button>
      </main>
    );
  }
}

export default Auth;