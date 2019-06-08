import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Renders the App component in the DOM element with an id of 'root'.
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
