import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Book.css';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  };
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book__image-container">
          {book.imageLinks && (
            <img
              className="book__image"
              src={book.imageLinks.smallThumbnail}
              alt={book.title}
            />
          )}
        </div>
        <h3 className="book__title">
          {book.title}
        </h3>
        <p className="book__authors" hidden={!book.authors}>
          {book.authors && book.authors.join(', ')}
        </p>
      </div>
    );
  }
}
