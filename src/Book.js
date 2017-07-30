import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Book.css';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  handleChange = event => {
    this.props.onChange(this.props.book, event.target.value);
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
        <div className="book__action">
          <select value={book.shelf} onChange={this.handleChange}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Reading</option>
            <option value="wantToRead">Want to read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    );
  }
}
