import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookShelf.css';
import ListBooks from './ListBooks';

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  render() {
    const { books } = this.props;
    const booksByShelf = books.reduce((byShelf, book) => {
      byShelf[book.shelf].push(book);
      return byShelf;
    }, {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    });
    return (
      <section className="bookshelf">
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Reading
          </h2>
          <ListBooks
            books={booksByShelf.currentlyReading}
          />
        </section>
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Will Read
          </h2>
          <ListBooks
            books={booksByShelf.wantToRead}
          />
        </section>
        <section className="bookshelf__shelf">
          <h2 className="bookshelf__heading">
            Read
          </h2>
          <ListBooks
            books={booksByShelf.read}
          />
        </section>
      </section>
    );
  }
}
