import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from './styles';

@observer
export default class Notes extends Component {
  render() {
    return (
      <NoteList store={this.props.store} />
    );
  }
  componentDidMount() {
    this.props.store.NoteStore.getNotesFromServer();
  }
}

const NoteList = observer(({ store }) => (
  <section className={styles.notes}>
    {store.NoteStore.notes.map((note, idx) => <Note note={note} key={note.id} store={store} idx={idx} />)}
    <AddNote store={store} />
  </section>
));

@observer
class Note extends Component {
  @observable beingEdited = false;
  @observable title;
  @observable body;

  constructor(props) {
    super(props);
    this.store = this.props.store.NoteStore;
    this.title = this.props.note.title;
    this.body = this.props.note.body;
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
}

@observer
class AddNote extends Component {
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
  handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    if (title && body) {
      this.props.store.NoteStore.add(title, body);
      e.target.title.value = '';
      e.target.body.value = '';
    }
  }
}