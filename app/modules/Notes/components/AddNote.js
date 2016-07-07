import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from '../styles.css';

@observer
export default class AddNote extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    if (title && body) {
      this.props.store.add(title, body);
      e.target.title.value = '';
      e.target.body.value = '';
    }
  }

  render() {
    return (
      <section className={styles.addNote}>
        <h3>Add new</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea name="title" placeholder="title" />
          <textarea name="body" rows="6" placeholder="note" />
          <button className={styles.submitButton}>Add</button>
        </form>
      </section>
    )
  }
}