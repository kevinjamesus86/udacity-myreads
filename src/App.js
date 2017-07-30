import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import SiteHeader from './SiteHeader';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(state => ({ books }));
    });
  }
  handleQueryChange = query => {
    this.setState({ query });
  };
  render() {
    const { books } = this.state;
    return (
      <main className="app">
        <SiteHeader
          onQueryChange={this.handleQueryChange}
        />
        <Route
          exact
          path='/'
          render={() =>
            <BookShelf books={books} />
          }
        />
        <Route
          path='/search'
          render={() =>
            <SearchBooks
              query={this.state.query}
            />
          }
        />
    </main>
  );
  }
}

export default BooksApp
