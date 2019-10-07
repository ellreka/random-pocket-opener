import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Cookies from 'js-cookie';
import Auth from './auth';
import Main from './main';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    const access_token = Cookies.get('access_token');
    if (access_token) {
      this.state.authenticated = true;
    }
  }

  render() {
    return (
      <div className="">
        <header className="st-Header d-flex justify-content-center align-items-center">
          <h4 className="st-Header_Title">Pocket Opener</h4>
        </header>
        {this.state.authenticated ? (
          <Main />
        ) : (
          <Auth />
        )}
        <footer>

        </footer>
      </div>
    );
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
);