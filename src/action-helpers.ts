import { ACTION_PREFIX, REMOTE_ACTION } from './constants';

export const actionType = (type: string): string => {
  return `${ACTION_PREFIX}/${type}`;
}

export const isLocalAction = (action: any): boolean => {
  const { type = '', [REMOTE_ACTION]: remoteAction } = action;
  return (type.startsWith(ACTION_PREFIX) && !remoteAction);
};
