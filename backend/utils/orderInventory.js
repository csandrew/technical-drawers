const Product = require('../models/Product');
const Order = require('../models/Order');

const restoreReservedItems = async (items) => {
    await Promise.all(items.map(({ productId, quantity }) =>
        Product.updateOne({ _id: productId }, { $inc: { stock: quantity } })
    ));
};

const reserveOrderItems = async (items) => {
    const reservedItems = [];

    try {
        for (const item of items) {
            const product = await Product.findOneAndUpdate(
                { _id: item.productId, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true, projection: { name: 1 } }
            );

            if (!product) {
                await restoreReservedItems(reservedItems);
                return item.name || 'An item';
            }

            reservedItems.push({
                productId: item.productId,
                quantity: item.quantity
            });
        }
        return null;
    } catch (error) {
        if (reservedItems.length > 0) {
            await restoreReservedItems(reservedItems);
        }
        throw error;
    }
};

const releaseOrderInventory = async (orderId) => {
    const order = await Order.findOneAndUpdate(
        {
            _id: orderId,
            paymentStatus: { $ne: 'paid' },
            inventoryReserved: true
        },
        { $set: { inventoryReserved: false } },
        { new: true }
    );

    if (!order) return false;
    await restoreReservedItems(order.items);
    return true;
};

module.exports = {
    reserveOrderItems,
    releaseOrderInventory,
    restoreReservedItems
};
