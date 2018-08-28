
var EventManager = (function() {
    var _instance;

    function em() {
        this.events = {};

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

        return {
                getInstance: getInstance,
                on: on,
                trigger: trigger,
        }
})();

module.exports = EventManager;
