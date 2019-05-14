// @flow

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>Hackernews by Mikael</h1>
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName={classes.active}>
              Top
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" activeClassName={classes.active}>
              Submit
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
