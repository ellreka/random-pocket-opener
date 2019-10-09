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
      <div className="">
        <header className="">
          <h4 className="">Pocket Opener</h4>
        </header>
        {this.state.authenticated ? (
          <Main />
        ) : (
          <Auth/>
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