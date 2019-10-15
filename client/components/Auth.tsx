import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

const Auth: React.FC = () => {

  const authenticationHandle = async () => {
    await axios({
      method: 'GET',
      url: '/auth'
    }).then((response) => {
      document.location.href = response['data'];
    })
  }

  return (
    <>
      <div className="st-Content px-3">
        <p className="mt-5">Sort, narrow down and open articles stored in your pocket</p>
        <Button className="mt-5" variant="outline-secondary" onClick={() => authenticationHandle()}>Authorize Pocket</Button>
      </div>
    </>
  )
}

export default Auth;