const pubsub = require('../../src/super-pubsub.js');

describe('super-pubsub.js', () => {


    // describe('on and trigger', () => {
    //     it('should trigger on-event once', () => {
    //         const expected = Math.random();
    //         let result = Math.random();
    //         const key = 'key' + Math.random();
    //         pubsub.sub(key, function(param) {
    //             result = param;
    //         });
    //         pubsub.pub(key, expected);
    //
    //         expect(result).to.eql(expected);
    //     });

    //     it('should trigger on-event multiple times', () => {
    //         const expected = Math.random();
    //         let result = [];
    //         const count = 3;
    //         const key = 'key' + Math.random();
    //
    //         for(let i=0; i < count; i++) {
    //             EventManger.on(key, function(param) {
    //                 result.push(param + '_' + i);
    //             });
    //         }
    //         EventManger.trigger(key, [expected]);
    //
    //         expect(result).to.eql([expected+ '_0', expected+ '_1', expected+ '_2']);
    //     });
    //
    //     it('should trigger with shorcurcuit', () => {
    //         const expected = Math.random();
    //         let result = [];
    //         const count = 3;
    //         const key = 'key' + Math.random();
    //
    //         for(let i=0; i < count; i++) {
    //             EventManger.on(key, function(param) {
    //                 result.push(param + '_' + i);
    //                 if (i==1) {
    //                    return true;
    //                 }
    //             });
    //         }
    //         EventManger.trigger(key, [expected]);
    //
    //         expect(result).to.eql([expected+ '_0', expected+ '_1']);
    //     });
    // });
    //
    describe('pub sub', () => {
        it('should pub then sub', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            pubsub.pub(key, expected);
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should sub and pub', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();

            pubsub.sub(key, (result) => {
                expect(result).to.eql(expected);
            });
            pubsub.pub(key, expected);
        });

        it('should pub then sub in EventManager I', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            pubsub.pub(key, expected);
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should pub then sub in EventManager II', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();
            pubsub.pub(key, expected);
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should pub then multi sub', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();

            pubsub.pub(key, expected);
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should multi sub before or after pub', () => {
            const expected = Math.random();
            const key = 'chan_' + Math.random();

            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });

            pubsub.pub(key, expected);

            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected);
            });
        });

        it('should multi pub and sub - test1', () => {
            const expected = Math.random();
            const expected1 = Math.random();
            const expected2 = Math.random();
            const key = 'chan_' + Math.random();

            const firstResultStack = [];

            pubsub.sub(key, function(result) {
                firstResultStack.push(result);
                // @todo here should use stud instead
                if (firstResultStack.length > 2) {
                    expect(firstResultStack).to.eql([expected, expected1, expected2]);
                }
            });

            pubsub.pub(key, expected);

            pubsub.pub(key, expected1);

            pubsub.pub(key, expected2);

            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected2);
            });
        });

        it('should multi pub and sub - test2', () => {
            const expected = Math.random();
            const expected1 = Math.random();
            const expected2 = Math.random();
            const key = 'chan_' + Math.random();

            const firstResultStack = [];
            const firstResultStack1 = [];

            pubsub.sub(key, function(result) {
                firstResultStack.push(result);
                // @todo here should use stud instead
                if (firstResultStack.length > 2) {
                    expect(firstResultStack).to.eql([expected, expected1, expected2]);
                }
            });

            pubsub.sub(key, function(result) {
                firstResultStack1.push(result);
                // @todo here should use stud instead
                if (firstResultStack1.length > 2) {
                    expect(firstResultStack1).to.eql([expected, expected1, expected2]);
                }
            });

            pubsub.pub(key, expected);

            pubsub.pub(key, expected1);

            pubsub.pub(key, expected2);

            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected2);
            });

            pubsub.sub(key, function(result) {
                expect(result).to.eql(expected2);
            });
        });
    });
});