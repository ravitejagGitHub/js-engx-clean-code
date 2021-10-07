const assert = require('assert');

const dateUtil = require('./date-util');

describe('date-util', () => {
    describe('changeToMidnight', () => {
        it('should increment date', () => {
            const date = new Date(2014, 10, 10);
            const expectedDate = new Date(2014, 10, 11);

            assert.strictEqual(dateUtil.changeToMidnight(date, true).getTime(), expectedDate.getTime());
        });

        it('should decrement date', () => {
            const date = new Date(2014, 10, 10);
            const expectedDate = new Date(2014, 10, 9);

            assert.strictEqual(dateUtil.changeToMidnight(date, false).getTime(), expectedDate.getTime());
        });
    });
});
