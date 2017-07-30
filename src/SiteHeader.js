import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import './SiteHeader.css';

export default class SiteHeader extends Component {
  static propTypes = {
    onQueryChange: PropTypes.func.isRequired,
  };
  handleQueryChange = event => {
    this.props.onQueryChange(event.target.value);
  };
  render() {
    return (
      <header className="header">
        <div className="header-inner">
          <h1 className="header__logo">my reads</h1>
          <nav className="site-links">
            <NavLink
              exact
              to="/"
              className="site-links__link">
              all
            </NavLink>
            <span className="site-links__link-divider"></span>
            <NavLink
              to="/reading"
              className="site-links__link">
              reading
            </NavLink>
            <span className="site-links__link-divider"></span>
            <NavLink
              to="/want-to-read"
              className="site-links__link">
              want to read
            </NavLink>
            <span className="site-links__link-divider"></span>
            <NavLink
              to="/read"
              className="site-links__link">
              read
            </NavLink>
          </nav>
          <Link
            to="/search"
            className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search for books"
              onChange={this.handleQueryChange}
            />
          </Link>
        </div>
      </header>
    );
  }
}
