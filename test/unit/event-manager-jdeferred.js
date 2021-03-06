const EventManger = require('../../src/event-manager-jdeferred.js');

describe('event-manager-jdeferred.js', () => {
    describe('constructor', () => {
        it('should have instance', () => {
            const em = EventManger.getInstance();
            expect(typeof em).to.eql('object');
        });

        it('should be the same instance', () => {
            const em = EventManger.getInstance();
            const em1 = EventManger.getInstance();
            expect(em).to.eql(em1);
        });
    });

    describe('on and trigger', () => {
        it('should trigger on-event once', () => {
            const expected = Math.random();
            let result = Math.random();
            const key = 'key' + Math.random();
            EventManger.on(key, function(param) {
                result = param;
            });
            EventManger.trigger(key, [expected]);

            expect(result).to.eql(expected);
        });

        it('should trigger on-event multiple times', () => {
            const expected = Math.random();
            let result = [];
            const count = 3;
            const key = 'key' + Math.random();

            for(let i=0; i < count; i++) {
                EventManger.on(key, function(param) {
                    result.push(param + '_' + i);
                });
            }
            EventManger.trigger(key, [expected]);

            expect(result).to.eql([expected+ '_0', expected+ '_1', expected+ '_2']);
        });

        it('should trigger with shorcurcuit', () => {
            const expected = Math.random();
            let result = [];
            const count = 3;
            const key = 'key' + Math.random();

            for(let i=0; i < count; i++) {
                EventManger.on(key, function(param) {
                    result.push(param + '_' + i);
                    if (i==1) {
                       return true;
                    }
                });
            }
            EventManger.trigger(key, [expected]);

            expect(result).to.eql([expected+ '_0', expected+ '_1']);
        });
    });

    describe('pub sub', () => {
        it('should pub then sub', () => {
            const em = EventManger.getInstance();
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            em.publish(key, expected);
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should sub and pub', () => {
            const em = EventManger.getInstance();
            const expected = Math.random();
            const key = 'chan_' + Math.random();

            em.subscribe(key, (result) => {
                expect(result).to.eql(expected);
            });
            em.publish(key, expected);
        });

        it('should pub then sub in EventManager I', () => {
            const em = EventManger;
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            em.publish(key, expected);
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should pub then sub in EventManager II', () => {
            const em = EventManger;
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            em.pub(key, expected);
            em.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should pub then multi sub', () => {
            const em = EventManger;
            const expected = Math.random();
            const key = 'chan_' + Math.random();

            em.publish(key, expected);
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should multi sub before or after pub', () => {
            const em = EventManger;
            const expected = Math.random();
            const key = 'chan_' + Math.random();
      
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });

            em.publish(key, expected);

            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should multi pub', () => {
            const em = EventManger;
            const expected = Math.random();
            const expected1 = Math.random();
            const key = 'chan_' + Math.random();
      
            em.subscribe(key, function(result) {
                expect(result).to.eql(expected);
            });

            em.publish(key, expected);

            em.publish(key, expected1);

            em.subscribe(key, function(result) {
                expect(result).to.eql(expected1);
            });
        });
    });
});