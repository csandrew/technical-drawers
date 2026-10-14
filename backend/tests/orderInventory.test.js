const assert = require('node:assert/strict');
const test = require('node:test');
const Product = require('../models/Product');
const Order = require('../models/Order');
const {
    reserveOrderItems,
    releaseOrderInventory
} = require('../utils/orderInventory');

test('reservation rolls back earlier items when a later item is out of stock', async (t) => {
    const originalFindOneAndUpdate = Product.findOneAndUpdate;
    const originalUpdateOne = Product.updateOne;
    const stock = new Map([
        ['board', 4],
        ['ruler', 1]
    ]);

    Product.findOneAndUpdate = async (filter, update) => {
        const available = stock.get(String(filter._id));
        if (available === undefined || available < filter.stock.$gte) return null;
        stock.set(String(filter._id), available + update.$inc.stock);
        return { name: filter._id === 'board' ? 'Drawing board' : 'Ruler' };
    };
    Product.updateOne = async (filter, update) => {
        stock.set(String(filter._id), stock.get(String(filter._id)) + update.$inc.stock);
    };
    t.after(() => {
        Product.findOneAndUpdate = originalFindOneAndUpdate;
        Product.updateOne = originalUpdateOne;
    });

    const unavailable = await reserveOrderItems([
        { productId: 'board', name: 'Drawing board', quantity: 2 },
        { productId: 'ruler', name: 'Ruler', quantity: 2 }
    ]);

    assert.equal(unavailable, 'Ruler');
    assert.equal(stock.get('board'), 4);
    assert.equal(stock.get('ruler'), 1);
});

test('inventory release restores reserved stock only once', async (t) => {
    const originalFindOneAndUpdate = Order.findOneAndUpdate;
    const originalUpdateOne = Product.updateOne;
    let inventoryReserved = true;
    let stock = 3;

    Order.findOneAndUpdate = async (_filter, update) => {
        if (!inventoryReserved) return null;
        inventoryReserved = update.$set.inventoryReserved;
        return {
            items: [{ productId: 'board', quantity: 2 }]
        };
    };
    Product.updateOne = async (_filter, update) => {
        stock += update.$inc.stock;
    };
    t.after(() => {
        Order.findOneAndUpdate = originalFindOneAndUpdate;
        Product.updateOne = originalUpdateOne;
    });

    assert.equal(await releaseOrderInventory('order-id'), true);
    assert.equal(await releaseOrderInventory('order-id'), false);
    assert.equal(stock, 5);
});
