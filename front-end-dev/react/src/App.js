/** @format */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Container from './components/Container';
import Login from './components/Login';
import Register from './components/Register';
import ItemDetail from './components/ItemDetail';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='website-main'>
          <Header />
          <Route exact path='/' component={Container} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/detail/:itemid' component={ItemDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
