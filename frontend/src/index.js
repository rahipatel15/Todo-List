import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>,
  document.getElementById('root')
);