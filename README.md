# redux-postmessage-middleware
A Redux middleware for sending and recieving actions over postmessage

# Getting Started

## Install

```
$ npm install --save redux-postmessage-middleware
```
or
```
$ yarn add redux-postmessage-middleware
```

## Usage Example

Suppose we want to share data or trigger an action from an Iframe to it's parent or vice versa.

```
import { actionType } from 'redux-postmessage-middleware';

const sendDataAction = (data) => ({
  type: actionType('SEND_DATA'),
  data
});

...

class MyComponent extends React.Component {
  ...
  sendData() {
    const { dispatch } = this.props
    const myData = { message: 'Hello World' };
    dispatch(sendDataAction(myData));
  }
  ...
}
```

The `sendDataAction` wont be sent to or recieved by another Redux Store outside the current frame unless we add two middlewares to the Redux Store.

```
import { createStore, applyMiddleware } from 'redux'
import {
  createMessageDispatcherMiddleware,
  createMessageRecieverMiddleware
} from 'redux-postmessage-middleware';

import reducer from './reducers'


// create MessageDispatcherMiddleware for sending actions over postmessage
const MessageDispatcherMiddleware = createMessageDispatcherMiddleware({
  senderURL: 'http://current.domain',
  parentURL: 'http://parent.domain',
  targetURLs: ['http://parent.domain', 'http://current.domain'],
});

// create MessageReceiverMiddleware for recieving actions from postmessages
const MessageReceiverMiddleware = createMessageRecieverMiddleware({
  allowedURLs: ['http://parent.domain', 'http://current.domain'],
});

// mount them on the Store
const middlewares = [
  MessageReceiverMiddleware,
  MessageDispatcherMiddleware,
];
const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)

// render application
```

Any action with a type created with the `actionType` method will be sent over postmessage to designated targetURLs if the MessageDispatcherMiddleware have been added to the Redux Store. The Redux Store will also be able to handle any such action if the MessageReceiverMiddleware have been added to the Store.

# API Reference

## Middleware API

### `createMessageDispatcherMiddleware`

Creates a Redux middleware which broadcasts actions over postmessage.

- `options: Object` - A list of options to pass to the middleware. Currently supported options are:
  - `senderURL: String` - The URL of the current frame which will be sent as the origin of the action.
  - `parentURL: String` - (Optional) If given, the action will be broadcasted to the parent window.
  - `targetURLs: []String` - All actions will be broadcasted to any frame matching these URLs.

### `createMessageRecieverMiddleware`

Creates a Redux middleware which listens to postmessages and dispatches any incoming action to the local Redux Store.

- `options: Object` - A list of options to pass to the middleware. Currently supported options are:
  - `allowedURLs: []String` - a list of URLs which are allowed to send actions to the Redux Store.

## Action Helpers

### `actionType`

A helper method for creating action types. Only actions created by this method will be sent over postmessage by the MessageDispatcherMiddleware.

