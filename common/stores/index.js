import { useStrict } from 'mobx';
useStrict(true);

import UIStore from './UIStore';
import TimerStore from './TimerStore';
import NoteStore from './NoteStore';

export default { UIStore, TimerStore, NoteStore };
