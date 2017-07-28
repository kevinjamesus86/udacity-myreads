import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import SiteHeader from './SiteHeader';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <SiteHeader />
        <Route
          exact
          path='/'
          component={ListBooks}
        />
        <Route
          path='/search'
          component={SearchBooks}
        />
      </div>
    )
  }
}

export default BooksApp
