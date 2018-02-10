import { isString } from './utils';

const getEventOrigin = (ev: MessageEvent): string => {
  const origin = ev.origin || (ev as any).originalEvent.origin;
  return origin;
};

const readAction = (ev: MessageEvent) => {
  try {
    const action: any = isString(ev.data) ? JSON.parse(ev.data) : ev.data;
    return action;
  } catch (ex) {
    return { type: '' };
  }
};

const isValidAction = (action: any): boolean => isString(action.type);

type Dependencies = {
  allowedURLs: string[];
}

export type ActionHandler = (action: any) => void;

export type MessageHandler = (ev: MessageEvent) => void;

export type MessageToActionHandler = (fn: ActionHandler) => MessageHandler;

export const createMessageToActionHandler = ({ allowedURLs }: Dependencies): MessageToActionHandler  => {

  const isValidOrigin = (origin: string): boolean => {
    return allowedURLs.some(url => url.includes(origin));
  };

  return (fn: ActionHandler): MessageHandler => (ev: MessageEvent) => {
    const origin = getEventOrigin(ev);
    if (!isValidOrigin(origin)) { return; }
    const action = readAction(ev);
    if (!isValidAction(action)) { return; }
    fn(action);
  };
};
