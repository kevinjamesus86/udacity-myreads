import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListBooks.css';
import Book from './Book';

export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  render() {
    const { books, onUpdateBook } = this.props;
    return (
      <ul className="list-books">
        {books.map((book, index) => (
          <li key={`${book.id}.${index}`} className="list-books__item">
            <Book book={book} onChange={onUpdateBook} />
          </li>
        ))}
      </ul>
    );
  }
}
