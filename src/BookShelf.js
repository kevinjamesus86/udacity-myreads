import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookShelf.css';
import ListBooks from './ListBooks';

export default class BookShelf extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  render() {
    const { shelves, onUpdateBook } = this.props;

    function listBooksOrElse({
      books,
      message
    }) {
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
          {shelves.map((shelf, index) =>
            <div key={index}>
              <h2 className="bookshelf__heading">
                {shelf.label}
              </h2>
              {listBooksOrElse({
                books: shelf.books,
                message: shelf.sansBooksMessage,
              })}
            </div>
          )}
        </section>
      </section>
    );
  }
}
