import { originFromURL, getOrigin } from './utils';

type Dependencies = {
  window: Window;
  document: Document;
  senderURL: string;
  parentURL?: string;
  targetURLs?: string[];
}

export type MessageDispatcher = (action: any) => void;

export const createMessageDispatcher = ({
  window, document, senderURL, parentURL = '', targetURLs = []
}: Dependencies): MessageDispatcher => {

  const senderOrigin = originFromURL(document)(senderURL);
  const parentOrigin = originFromURL(document)(parentURL);
  const targetOrigins = targetURLs.map(originFromURL(document));


  return (action: any) => {
    const data = JSON.stringify(action);

    // dispatch event parent
    if (parentOrigin) {
      window.parent.postMessage(data, parentOrigin);
    }

    // dispatch to all target URLs
    const frames: any = window.parent.frames;
    for (let i = 0; i < frames.length; i++) {
      try {
        const frameOrigin = getOrigin(frames[i].location);
        if (frames[i] !== window && targetOrigins.includes(frameOrigin)) {
          frames[i].postMessage(data, senderOrigin);
        }
      } finally {
        continue;
      }
    }
  };

}
