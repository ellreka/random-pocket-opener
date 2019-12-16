import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { setStore } from './app/store';

const store = setStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
