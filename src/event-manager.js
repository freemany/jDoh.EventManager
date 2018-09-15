
var EventManager = (function() {
    var _instance;

    function em() {
        this.events = {};
        this.channels = {};

        this.publish = function(key, item) {
             this.channels[key] = item;
             return true;
        }

        this.subscribe = function(key, callback) {
             if (undefined === this.channels[key] || typeof callback !== 'function') {
                  return null;
             }
             return callback.call(this, this.channels[key]);
        }

        this.on = function(key, callback) {
                    if (undefined === this.events[key]) {
                        this.events[key] = [];
                    }
                    this.events[key].push(callback);

                    return true;
                };

        this.trigger = function(key, params) {
                    if (undefined === this.events[key]) {
                        return false;
                    }

                    for(var i=0; i < this.events[key].length; i++) {
                        var shortCurcuit = this.events[key][i].apply(this, params);
                        if (true === shortCurcuit) {
                            return true;
                        }
                    }
                    return;
                }
        }

        function getInstance() {
                if (undefined === _instance) {
                    _instance = new em();
                }

                return _instance;
        }

        function on(key, callback) {
                return getInstance().on(key, callback);
        }

        function trigger(key, params) {
                return getInstance().trigger(key, params);
        }

        function publish(key, item) {
            return getInstance().publish(key, item);
        }

        function subscribe(key, callback) {
            return getInstance().subscribe(key, callback);
        }

        return {
                getInstance: getInstance,
                on: on,
                attach: on,
                trigger: trigger,
                emit: trigger,
                publish: publish,
                pub: publish,
                subscribe: subscribe,
                sub: subscribe,
        }
})();

module.exports = EventManager;
