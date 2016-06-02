import React, { Component, cloneElement } from 'react';
import DevTools from 'mobx-react-devtools';
import Header from '../Header';
import styles from './styles.css';

export default ({ route, children }) => (
  <div>
    <Header />
    <main role="main" className={styles.main}>
      {cloneElement(children, { store: route.store })}
    </main>
    <DevTools position={{ bottom: 0, right: 20 }} />
  </div>
);