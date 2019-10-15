import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Auth from './Auth';
import Main from './Main';

const App: React.FC = () => {

  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  })

  return (
    <div className="st-Container">
      <header className="st-Header">
        <h4>
          <img src="./images/pocket-opener.png" width="30px" height="30px" alt="" className="mr-2"/>
          Pocket Opener
        </h4>
      </header>
      <main>
      { authenticated ? (
        <Main />
      ) : (
        <Auth/>
      )}
      </main>
      <footer className="st-Footer">
        <p>
          <a href="https://github.com/ellreka/pocket-opener" target="_blank">github</a>
          <span>  /  </span>
          <a href="https://twitter.com/ellreka" target="_blank">twitter</a>
          <span>  /  </span>
          <a href="https://app.getpocket.com/" target="_blank">Pocket</a>
        </p>
        <span>© 2019 ellreka</span>
      </footer>
    </div>
  )
}

export default App;