import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import SiteHeader from './SiteHeader';
import BookShelf from './BookShelf';
import ListSearchBooks from './ListSearchBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {
  state = {
    searchBooks: [],
    books: [],
    query: '',
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(state => ({ books }));
    });
  }
  searchBooks = query => {
    this.setState({ query });
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        this.setState({
          searchBooks: books.error ? [] : books,
        });
      });
    } else {
      this.setState({
        searchBooks: []
      });
    }
  };
  render() {
    const { books, searchBooks } = this.state;
    return (
      <main className="app">
        <SiteHeader
          onQueryChange={this.searchBooks}
        />
        <Route
          exact
          path='/'
          render={() =>
            <BookShelf
              books={books}
            />
          }
        />
        <Route
          path='/search'
          render={() =>
            <ListSearchBooks
              books={searchBooks}
              query={this.state.query}
            />
          }
        />
    </main>
  );
  }
}

export default BooksApp
