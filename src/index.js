import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Random Pocket Opener</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
);