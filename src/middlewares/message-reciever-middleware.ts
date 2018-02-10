/// <reference path="index.d.ts" />

import { REMOTE_ACTION } from '../constants';
import { MessageToActionHandler } from '../messaging';

type MessageRecieverDependencies = {
  messageToActionHandler: MessageToActionHandler;
};

export const MessageRecieverMiddleware = ({ messageToActionHandler }: MessageRecieverDependencies) => (store: Store) => {
  window.addEventListener('message', messageToActionHandler((msgAction: any) => {
    store.dispatch(Object.defineProperty(msgAction, REMOTE_ACTION, { value: true }))
  }));
  return (next: Dispatch) => (action: any) => next(action);
};



