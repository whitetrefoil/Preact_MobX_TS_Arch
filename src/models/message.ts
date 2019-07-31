import { action, observable } from 'mobx';

export class MessageModel {
  @observable messages: string[] = [];

  @action.bound
  push(msg: string) {
    this.messages.push(msg);
  }

  @action.bound
  dismiss() {
    this.messages.shift();
  }
}

const messageModel = new MessageModel();

export default messageModel;
