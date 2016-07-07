import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './styles.css';

export default function Header() {
  return (
    <header role="banner" className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <nav className={styles.menu}>
          <ul>
            <li><IndexLink to="/">Timer</IndexLink></li>
            <li><Link to="notes">Notes</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}