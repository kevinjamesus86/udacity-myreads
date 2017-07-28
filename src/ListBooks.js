import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ListBooks.css';
import Book from './Book';

export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  render() {
    const { books } = this.props;
    return (
      <ul className="list-books">
        {books.map(book =>
          <li key={book.id} className="list-books__item">
            <Book book={book} />
          </li>
        )}
      </ul>
    );
  }
}
