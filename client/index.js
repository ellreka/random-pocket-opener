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
      authenticated: false,
    };
  }
  componentDidMount() {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      this.setState({authenticated: true})
    } else {
      this.setState({authenticated: false})
    }
  }

  render() {
    return (
      <div className="st-Container">
        <header className="st-Header">
          <h4><img src="./images/pocket-opener.png" width="30px" height="30px" alt="" className="mr-2"/>Pocket Opener</h4>
        </header>
        {this.state.authenticated ? (
          <Main />
        ) : (
          <Auth/>
        )}
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
    );
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
);