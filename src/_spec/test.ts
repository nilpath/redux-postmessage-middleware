import { expect } from 'chai';
//import { createStore, applyMiddleware } from 'redux';


/* const createTestStore = (middlewares: any[]) => {
  return createStore(
    () => {},
    applyMiddleware(...middlewares)
  )
} */


describe('test', () => {

  describe('JSDOM', () => {
    it('should communicate with inner iframes', done => {

      var frame = window.document.createElement('iframe');

      window.document.body.appendChild(frame);

      frame.contentWindow.addEventListener('message', e => {
        expect(e.data.message).to.equal('hello');
        //done();
      });

      frame.contentWindow.postMessage({
        message: 'hello'
      }, '*');
    });
  });

});
