import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

class Auth extends React.Component {

async authenticationHandle( req, res ) {
  const authorize_url = await axios({
    method: 'GET',
    url: '/auth'
  })
  document.location.href = authorize_url['data']['authorize_url'];
}

  render() {
    return (
      <main>
        <div className="st-Content px-3">
          <p className="mt-5">Sort, narrow down and open articles stored in your pocket</p>
          <Button className="mt-5" variant="outline-secondary" onClick={() => this.authenticationHandle()}>Authorize Pocket</Button>
        </div>
      </main>
    );
  }
}

export default Auth;