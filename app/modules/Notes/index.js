import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NoteList from './components/NoteList';

@observer(["noteStore"])
export default class Notes extends Component {
  componentDidMount() {
    this.props.noteStore.getNotesFromServer();
  }
  
  render() {
    return (
      <NoteList store={this.props.noteStore} />
    );
  }
}

export store from './store';