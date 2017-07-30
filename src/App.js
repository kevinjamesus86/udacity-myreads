import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
      this.setBooks(books);
    });
  }
  searchBooks = query => {
    this.setState({ query });
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        books = books.error ? [] : books;
        this.updateShelvesToMatchOwnBooks(books);
        this.setState({
          searchBooks: books,
        });
      });
    } else {
      this.setState({
        searchBooks: []
      });
    }
  };
  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.slice(0);
      const bookIndex = books.findIndex(b => b.id === book.id);
      book.shelf = shelf;
      if (shelf === 'none' && ~bookIndex) {
        books.splice(bookIndex, 1);
      } else if (bookIndex === -1) {
        books.push(book);
      }
      this.setBooks(books);
    });
  };
  setBooks = books => {
    this.bookIdsToShelves = Object.create(null);
    books.forEach(({id, shelf}) => this.bookIdsToShelves[id] = shelf);
    this.setState({ books });
  };
  updateShelvesToMatchOwnBooks = books => {
    books.forEach(book => {
      book.shelf = book.id in this.bookIdsToShelves ?
        this.bookIdsToShelves[book.id] : 'none';
    });
  };
  render() {
    const { books, searchBooks } = this.state;

    return (
      <main className="app">
        <SiteHeader
          onQueryChange={this.searchBooks}
        />
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              <BookShelf
                books={books}
                onUpdateBook={this.onUpdateBook}
              />
            }
          />
          <Route
            path='/search'
            render={() =>
              <ListSearchBooks
                books={searchBooks}
                query={this.state.query}
                onUpdateBook={this.onUpdateBook}
              />
            }
          />
          <Route
            path='/:shelf'
            render={({ location }) => {
              const filteredBooks = books.filter(book =>
                book.shelf === location.state.shelf);
              return (
                <BookShelf
                  books={filteredBooks}
                  onUpdateBook={this.onUpdateBook}
                />
              );
            }}
          />
        </Switch>
    </main>
  );
  }
}

export default BooksApp
