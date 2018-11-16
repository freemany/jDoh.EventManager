const $ = require('jquery-deferred');

var EventManager = (function() {
    var _instance;

    function em() {
        this.events = {};
        this.channels = {};
        this.pubSubPromise = {};

        this.publish = function(key, item) {
            if (undefined === this.pubSubPromise[key] || true === this.pubSubPromise[key]['published']) {
                this.pubSubPromise[key] = {}; 
                var defer = $.Deferred();
                this.pubSubPromise[key]['r'] = defer.resolve;
                defer.resolve(item);
                this.pubSubPromise[key]['p'] = defer.promise();
            } else {
                this.pubSubPromise[key]['r'](item);
            }

            this.pubSubPromise[key]['published'] = true;
        }

        this.subscribe = function(key, callback) { 
             if (typeof callback !== 'function') {
                return null;
             }

             if (undefined === this.pubSubPromise[key]) {
                this.pubSubPromise[key] = {}; 
                var defer = $.Deferred();
                this.pubSubPromise[key]['r'] = defer.resolve;
                this.pubSubPromise[key]['p'] = defer.promise();
            } 
            this.pubSubPromise[key]['p'].then(callback);
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
