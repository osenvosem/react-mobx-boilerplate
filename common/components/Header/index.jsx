import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './styles.css';

export default () => (
  <header role="banner" className={styles.wrapper}>
    <div className={styles.wrapperInner}>
      <nav className={styles.menu}>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="notes">Notes</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);