const pubSubPromise = {};
const callbackStack = {};
const resultStack = {};

const pub = (key, item) => {
      if (undefined === pubSubPromise[key]) {
          pubSubPromise[key] = {};
      }
      if (undefined === callbackStack[key]) {
        callbackStack[key] = [];
      }

      resultStack[key] = item;

      pubSubPromise[key]['p'] = new Promise((resolve) => {
        pubSubPromise[key]['r'] = resolve;
        resolve(item);
      });

      callbackStack[key].forEach((c) => {
          pubSubPromise[key]['p'].then(c);
      });
};

const sub = (key, callback) => {
      if (typeof callback !== 'function') {
          return null;
      }

      if (undefined === pubSubPromise[key]) {
          pubSubPromise[key] = {};
      }
      pubSubPromise[key]['p'] = new Promise((resolve) => {
        pubSubPromise[key]['r'] = resolve;
      });

      if (undefined === callbackStack[key]) {
          callbackStack[key] = [];
      }
      callbackStack[key].push(callback);

      if (undefined !== resultStack[key]) {
          callback(resultStack[key]);
      }
};

// export {pub, sub};
module.exports = {pub, sub};
