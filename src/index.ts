import { createMessageDispatcher, createMessageToActionHandler } from './messaging';
import { MessageDispatcherMiddleware, MessageRecieverMiddleware } from './middlewares';

export { actionType } from './action-helpers';

type MessageDispatchingOptions = {
  senderURL: string;
  parentURL?: string;
  targetURLs?: string[];
};

export const createMessageDispatcherMiddleware = ({ senderURL, parentURL, targetURLs }: MessageDispatchingOptions) => {
  const dispatch = createMessageDispatcher({
    window,
    document,
    senderURL,
    parentURL,
    targetURLs,
  });

  return MessageDispatcherMiddleware({ dispatch });
}

type MessageRecieverOptions = {
  allowedURLs: string[];
  allowedTypes?: string[];
};

export const createMessageRecieverMiddleware = ({ allowedURLs, allowedTypes = [] }: MessageRecieverOptions) => {
  const messageToActionHandler = createMessageToActionHandler({
    allowedURLs,
    allowedTypes
  });

  return MessageRecieverMiddleware({ messageToActionHandler });
}
