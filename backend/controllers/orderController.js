import { ORDERS_DB } from '../config/db.js';

// Place New Pickle Order
export const placeOrder = (req, res) => {
  const { customer, items, total_amount } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid order payload' });
  }

  const orderId = `AHF-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder = {
    orderId,
    customer,
    items,
    total_amount,
    status: 'Placed',
    createdAt: new Date().toISOString()
  };

  ORDERS_DB.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    orderId,
    data: newOrder
  });
};

// Get Order Details by Order ID
export const getOrderById = (req, res) => {
  const { orderId } = req.params;
  const order = ORDERS_DB.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, data: order });
};
