/// <reference path="index.d.ts" />

import { MessageDispatcher } from '../messaging';
import { isLocalAction } from '../action-helpers';

type MessageDispatcherDependencies = {
  dispatch: MessageDispatcher
};

export const MessageDispatcherMiddleware = ({ dispatch }: MessageDispatcherDependencies) => () => (next: Dispatch) => (action: any) => {
  if (isLocalAction(action)) {
    dispatch(action);
  }
  next(action);
};
