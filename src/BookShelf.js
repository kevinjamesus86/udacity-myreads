import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookShelf.css';
import ListBooks from './ListBooks';

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  render() {
    const { books, onUpdateBook } = this.props;
    const booksByShelf = books.reduce((byShelf, book) => {
      byShelf[book.shelf].push(book);
      return byShelf;
    }, {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    });

    function listBooksOrElse(books, message) {
      return books.length ?
        <ListBooks
          books={books}
          onUpdateBook={onUpdateBook}
        /> :
        <div className="bookshelf-alt">
          {message}
        </div>;
    }

    return (
      <section className="bookshelf">
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Reading
          </h2>
          {listBooksOrElse(booksByShelf.currentlyReading,
            'Go find a book')}
        </section>
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Want to read
          </h2>
          {listBooksOrElse(booksByShelf.wantToRead,
            'Really? nothing?')}
        </section>
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Read
          </h2>
          {listBooksOrElse(booksByShelf.read,
            'Come on now..')}
        </section>
      </section>
    );
  }
}
