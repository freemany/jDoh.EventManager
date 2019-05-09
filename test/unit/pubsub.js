const {pub, sub} = require('../../src/pubsub.js');

describe('lib/pubsub.js', () => {

    it('should pub then sub', () => {
        const expected = Math.random();
        const key = 'chan_' + Math.random();
        pub(key, expected);
        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
    });

    it('should sub and pub', () => {
        const expected = Math.random();
        const key = 'chan_' + Math.random();

        sub(key, (result) => {
            expect(result).to.eql(expected);
        });
        pub(key, expected);
    });

    it('should pub then multi sub', () => {
        const expected = Math.random();
        const key = 'chan_' + Math.random();

        pub(key, expected);
        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
    });

    it('should multi sub before or after pub', () => {
        const expected = Math.random();
        const key = 'chan_' + Math.random();

        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
        sub(key, function (result) {
            expect(result).to.eql(expected);
        });

        pub(key, expected);

        sub(key, function (result) {
            expect(result).to.eql(expected);
        });
    });

    it('should multi pub and sub - 1', () => {
        const expected = Math.random();
        const expected1 = Math.random();
        const expected2 = Math.random();
        const key = 'chan_' + Math.random();

        const firstResultStack = [];

        sub(key, function (result) {
            firstResultStack.push(result);
        });

        pub(key, expected);

        pub(key, expected1);

        pub(key, expected2);

        sub(key, function (result) {
            expect(result).to.eql(expected2);
        });

        expect(firstResultStack).to.eql([expected, expected1, expected2]);
    });

    it('should multi pub and sub - 2', () => {
        const expected = Math.random();
        const expected1 = Math.random();
        const expected2 = Math.random();
        const expected3 = Math.random();
        const key = 'chan_' + Math.random();

        const firstResultStack = [];
        const firstResultStack1 = [];

        sub(key, function (result) {
            firstResultStack.push(result);
        });

        pub(key, expected);

        pub(key, expected1);

        pub(key, expected2);

        sub(key, function (result) {
            firstResultStack1.push(result);
        });

        pub(key, expected3);

        expect(firstResultStack).to.eql([expected, expected1, expected2, expected3]);
        expect(firstResultStack1).to.eql([expected2, expected3]);
    });

    it('should multi pub and sub - 3', () => {
        const expected = Math.random();
        const expected1 = Math.random();
        const expected2 = Math.random();
        const key = 'chan_' + Math.random();

        const firstResultStack = [];
        const firstResultStack1 = [];

        sub(key, function (result) {
            firstResultStack.push(result);
        });

        sub(key, function (result) {
            firstResultStack1.push(result);
        });

        pub(key, expected);

        pub(key, expected1);

        pub(key, expected2);

        sub(key, function (result) {
            expect(result).to.eql(expected2);
        });

        sub(key, function (result) {
            expect(result).to.eql(expected2);
        });

        expect(firstResultStack).to.eql([expected, expected1, expected2]);
        expect(firstResultStack1).to.eql([expected, expected1, expected2]);
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
        sub(key, function (result) {
            firstResultStack.push(result);

            return result + returnValueSuffix;
        });

        sub(key, function (result) {
            // Check if it is called,
            // never called because shortcuit above, so no error thrown
            expect(1).to.eql(2);
        });

        shortCurcuitReturn.push(pub(key, expected));

        shortCurcuitReturn.push(pub(key, expected1));

        shortCurcuitReturn.push(pub(key, expected2));

        sub(key, function (result) {
            // First time call returns the latest value
            expect(result).to.eql(expected2);
        });

        sub(key, function (result) {
            // First time call returns the latest value
            expect(result).to.eql(expected2);
        });

        //  Assert value return
        expect(shortCurcuitReturn).to.eql([expected + returnValueSuffix, expected1 + returnValueSuffix, expected2 + returnValueSuffix]);
        expect(firstResultStack).to.eql([expected, expected1, expected2]);
    });
});


