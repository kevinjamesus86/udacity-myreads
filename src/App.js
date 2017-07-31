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
        searchBooks: [],
      });
    }
  };
  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.slice(0);
      const bookIndex = books.findIndex(b => b.id === book.id);
      const originalBook = book;

      // If we have this on a shelf grab it, otherwise
      // we're working with a new book.
      book = ~bookIndex ? books[bookIndex] : book;
      originalBook.shelf = book.shelf = shelf;

      // Removing a shelved book
      if (shelf === 'none' && ~bookIndex) {
        books.splice(bookIndex, 1);
      } else if (bookIndex === -1) {
        // Adding a new book
        books.push(book);
      }

      this.setBooks(books);
    });
  };
  setBooks = books => {
    const entries = books.map(book => [book.id, book.shelf]);
    this.bookIdsToShelves = new Map(entries);
    this.setState({ books });
  };
  updateShelvesToMatchOwnBooks = books => {
    books.forEach(book => {
      book.shelf = this.bookIdsToShelves.get(book.id) || 'none';
    });
  };
  groupBooksForBookshelf = (books, filter) => {
    const booksByShelf = books.reduce(
      (byShelf, book) => {
        byShelf[book.shelf].push(book);
        return byShelf;
      },
      {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      }
    );

    const shelves = [
      {
        label: 'Reading',
        books: booksByShelf.currentlyReading,
        sansBooksMessage: 'Go find a book',
      },
      {
        label: 'Want to read',
        books: booksByShelf.wantToRead,
        sansBooksMessage: 'Really? Nothing?',
      },
      {
        label: 'Read',
        books: booksByShelf.read,
        sansBooksMessage: 'Come on now...',
      },
    ];

    return filter
      ? shelves.splice(
          {
            currentlyReading: 0,
            wantToRead: 1,
            read: 2,
          }[filter],
          1
        )
      : shelves;
  };
  render() {
    const { books, searchBooks } = this.state;

    return (
      <main className="app">
        <SiteHeader onQueryChange={this.searchBooks} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookShelf
                shelves={this.groupBooksForBookshelf(books)}
                onUpdateBook={this.onUpdateBook}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <ListSearchBooks
                books={searchBooks}
                query={this.state.query}
                onUpdateBook={this.onUpdateBook}
              />
            )}
          />
          <Route
            path="/:shelf"
            render={route => {
              const shelves = this.groupBooksForBookshelf(
                books,
                route.location.state.shelf
              );
              return (
                <BookShelf shelves={shelves} onUpdateBook={this.onUpdateBook} />
              );
            }}
          />
        </Switch>
      </main>
    );
  }
}

export default BooksApp;
