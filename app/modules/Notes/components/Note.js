import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from '../styles.css';

@observer
export default class Note extends Component {
  @observable beingEdited = false;
  @observable title;
  @observable body;

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.title = this.props.note.title;
    this.body = this.props.note.body;
  }

  @action
  toggleBeingEdited = (e) => {
    this.beingEdited = !this.beingEdited;
    if (!this.beingEdited) {
      this.store.update(this.props.idx, this.title, this.body);
    }
  }

  @action
  handleTitleEditing = (e) => {
    this.title = e.target.value;
  }

  @action
  handleBodyEditing = (e) => {
    this.body = e.target.value;
  }

  handleRemove = () => {
    this.store.remove(this.props.idx);
  }

  render() {
    let { title, body } = this.props.note;
    return (
      <article className={styles.note}>
        <section className={styles.controlButtons}>
          <button className={styles.remove} onClick={this.handleRemove}>&#10060;</button>
          <button
            className={this.beingEdited ? styles.editActive : styles.edit}
            onClick={this.toggleBeingEdited}
          >&#9999;</button>
        </section>
        {
          this.beingEdited ?
            <textarea
              className={styles.editTitle}
              value={this.title}
              onChange={this.handleTitleEditing}
            /> :
            <h3 className={styles.title}>{this.title}</h3>
        }{
          this.beingEdited ?
            <textarea
              className={styles.editBody}
              value={this.body}
              onChange={this.handleBodyEditing}
            /> :
            <div className={styles.body}>{this.body}</div>
        }
      </article>
    )
  }
}