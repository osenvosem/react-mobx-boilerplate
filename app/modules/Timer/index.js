import React, { Component } from 'react';
import { Link } from 'react-router';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import styles from './styles.css';

@observer(["timerStore"])
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.timerStore;
  }

  componentDidMount() {
    this.store.startTimer();
  }

  componentWillUnmount() {
    this.store.stopTimer();
  }

  render() {
    return (
      <div>
        <h1>
          <span className={styles.label}>Timer:</span>
          <span className={styles.counter}> {this.store.counter}</span>
        </h1>
        <button
          onClick={this.store.reset}
          className={styles.resetButton}
        >Reset</button>
        <button
          onClick={this.store.decrement}
          className={styles.incButton}
        >-10</button>
        <button
          onClick={this.store.increment}
          className={styles.decButton}
        >+10</button>
      </div>
    );
  }
}

export store from './store';