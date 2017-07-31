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
  componentDidMount() {
    let frame;
    window.addEventListener('scroll', () => {
      frame = frame || window.requestAnimationFrame(() => {
        frame = null;
        this.header.classList.toggle('smoosh',
          window.scrollY >= 50);
      });
    }, {
      capture: false,
      passive: true,
    });
  }
  render() {
    return (
      <header ref={el => (this.header = el)} className="header">
        <div className="header-inner">
          <h1 className="header__logo">my reads</h1>
          <nav className="site-links">
            <NavLink exact to="/" className="site-links__link">
              all
            </NavLink>
            <span className="site-links__link-divider" />
            <NavLink
              className="site-links__link"
              to={{
                pathname: '/reading',
                state: {
                  shelf: 'currentlyReading',
                },
              }}>
              reading
            </NavLink>
            <span className="site-links__link-divider" />
            <NavLink
              className="site-links__link"
              to={{
                pathname: '/want-to-read',
                state: {
                  shelf: 'wantToRead',
                },
              }}>
              want to read
            </NavLink>
            <span className="site-links__link-divider" />
            <NavLink
              className="site-links__link"
              to={{
                pathname: '/read',
                state: {
                  shelf: 'read',
                },
              }}>
              read
            </NavLink>
          </nav>
          <Link to="/search" className="search-container">
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
