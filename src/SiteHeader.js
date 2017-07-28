import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SiteHeader.css';

export default class SiteHeader extends Component {
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
              exact
              to="/reading"
              className="site-links__link">
              reading
            </NavLink>
            <span className="site-links__link-divider"></span>
            <NavLink
              exact
              to="/will-read"
              className="site-links__link">
              will read
            </NavLink>
            <span className="site-links__link-divider"></span>
            <NavLink
              exact
              to="/read"
              className="site-links__link">
              read
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}
