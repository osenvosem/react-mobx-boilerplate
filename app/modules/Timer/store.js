import { observable, action, autorun, transaction } from 'mobx';

class TimerStore {
  @observable counter = 0;
  intervalObj;

  @action startTimer = () => {
    this.intervalObj = setInterval(action(() => { this.counter++; }), 1000);
  }
  @action stopTimer = () => {
    clearInterval(this.intervalObj);
  }
  @action increment = () => {
    this.counter += 10;
    return this.counter;
  }
  @action decrement = () => {
    this.counter -= 10;
    return this.counter;
  }
  @action reset = () => {
    this.counter = 0;
    return this.counter;
  }
}

const store = new TimerStore;
export default store;