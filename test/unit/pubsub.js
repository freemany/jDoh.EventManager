const pubsub = require('../../src/pubsub.js');

describe('pubsub.js', () => {

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

        it('can be shortcurcuited and value returned', () => {
            const expected = Math.random();
            const expected1 = Math.random();
            const expected2 = Math.random();
            const key = 'chan_' + Math.random();

            const firstResultStack = [];
            const shortCurcuitReturn = [];
            const returnValueSuffix = '_' + Math.random();

            // Shortcurcuit here
            pubsub.sub(key, function(result) {
                firstResultStack.push(result);
                // @todo here should use stud instead
                if (firstResultStack.length > 2) {
                    expect(firstResultStack).to.eql([expected, expected1, expected2]);
                }

                return result + returnValueSuffix;
            });

            pubsub.sub(key, function(result) {
                // Here never be called, so error thrown
                expect(1).to.equal(2);
            });

            shortCurcuitReturn.push(pubsub.pub(key, expected));

            shortCurcuitReturn.push(pubsub.pub(key, expected1));

            shortCurcuitReturn.push(pubsub.pub(key, expected2));

            pubsub.sub(key, function(result) {
                // First time call returns the latest value
                expect(result).to.eql(expected2);
            });

            pubsub.sub(key, function(result) {
                // First time call returns the latest value
                expect(result).to.eql(expected2);
            });

            //  Assert value return
            expect(shortCurcuitReturn).to.eql([expected + returnValueSuffix, expected1 + returnValueSuffix, expected2 + returnValueSuffix]);
        });
    });
});