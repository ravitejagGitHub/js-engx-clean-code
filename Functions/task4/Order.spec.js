const assert = require('assert');

const Order = require('./Order');

function generateProduct(isAvailable, productPrice) {
    return { isAvailable, productPrice };
}

describe('Order', () => {
    let order = null;

    before(() => {
        order = new Order();
    });

    describe('getPriceOfAvailableProducts', () => {
        it('should return 0 for order w/o products', () => {
            order.setProducts([]);

            assert.strictEqual(order.getPriceOfAvailableProducts(), 0);
        });

        it('should return 0 for order with unavailable products only', () => {
            order.setProducts([
                generateProduct(false, 190),
                generateProduct(false, 0),
                generateProduct(false, 4),
            ]);

            assert.strictEqual(order.getPriceOfAvailableProducts(), 0);
        });

        it('should correctly calculate price for order with available products only', () => {
            order.setProducts([
                generateProduct(true, 18),
                generateProduct(true, 7),
            ]);

            assert.strictEqual(order.getPriceOfAvailableProducts(), 25);
        });

        it('should correctly calculate price for order with mixed products', () => {
            order.setProducts([
                generateProduct(true, 18),
                generateProduct(false, 190),
                generateProduct(true, 7),
            ]);

            assert.strictEqual(order.getPriceOfAvailableProducts(), 25);
        });
    });
});
