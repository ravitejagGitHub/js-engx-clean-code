module.exports = class Order {
    getPriceOfAvailableProducts() {
        let orderPrice = 0;
        for (const product of this.getAvailableProducts()) {
            orderPrice += product.productPrice;
        }
        return orderPrice;
    }

    getAvailableProducts() {
        return this.products && this.products.filter((product) => product.isAvailable) || [];
    }

    setProducts(products) {
        this.products = products;
    }

    getProducts() {
        return this.products;
    }
};
