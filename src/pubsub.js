const callbackStack = {};
const resultStack = {};

const pub = (key, item) => {
      let shortCurcuit;

      if (undefined === callbackStack[key]) {
        callbackStack[key] = [];
      }

      resultStack[key] = item;

      for(let i=0; i < callbackStack[key].length; i++) {
        shortCurcuit = callbackStack[key][i](item);
        if (undefined !== shortCurcuit) {
            return shortCurcuit;
        }
      }
};

const sub = (key, callback) => {
      if (typeof callback !== 'function') {
          return null;
      }

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
