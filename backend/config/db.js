// =======================================================
// ANU HOME FOODS - Extended Backend Database & Repository Layer
// Connects to MySQL Pool with In-Memory Repository Fallbacks
// =======================================================

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// In-Memory Catalog & Repositories (Fallback when MySQL is Offline)
export const PRODUCTS_DB = [
  {
    id: 'andhra-mango-pickle',
    name: 'Andhra Avakaya Mango Pickle',
    category: 'veg',
    price: 299,
    oldPrice: 349,
    rating: 4.9,
    reviewsCount: 142,
    isVeg: true,
    isBestSeller: true,
    discount: '14% OFF',
    image: '/images/mango_pickle.png',
    shortDescription: 'Authentic handcrafted cut mango pickle prepared with Guntur chilli and cold-pressed sesame oil.',
    description: 'Our signature Avakaya Mango Pickle is prepared in traditional Vijayawada style using sun-dried raw sour mangoes, hand-milled red chilli powder, mustard seeds, and pure unrefined sesame oil.',
    ingredients: ['Raw Cut Mangoes', 'Red Chilli Powder', 'Mustard Powder', 'Garlic', 'Cold-Pressed Sesame Oil', 'Sea Salt', 'Fenugreek'],
    storageInfo: 'Store in a cool, dry place. Always use a dry spoon. Keeps fresh for 12 months.',
    shippingInfo: 'Ships within 24 hours in leak-proof sealed food-grade glass jars.'
  },
  {
    id: 'authentic-gongura-pickle',
    name: 'Authentic Andhra Gongura Pickle',
    category: 'veg',
    price: 279,
    oldPrice: 319,
    rating: 4.8,
    reviewsCount: 98,
    isVeg: true,
    isBestSeller: true,
    discount: '12% OFF',
    image: '/images/gongura_pickle.png',
    shortDescription: 'Tangy red sorrel leaf pickle roasted with garlic, coriander seeds, and sesame oil.',
    description: 'Gongura (Red Sorrel) is known as the pride of Andhra cuisine. Made by slow-roasting fresh organic Gongura leaves in garlic and ground spices.',
    ingredients: ['Fresh Gongura Leaves', 'Garlic Cloves', 'Red Chilli', 'Sesame Oil', 'Coriander Seeds', 'Cumin', 'Sea Salt'],
    storageInfo: 'Refrigerate after opening for extended freshness.',
    shippingInfo: 'Dispatched in double-sealed airtight containers.'
  },
  {
    id: 'spicy-garlic-pickle',
    name: 'Fiery Spicy Garlic Pickle',
    category: 'spicy',
    price: 329,
    oldPrice: 379,
    rating: 4.9,
    reviewsCount: 115,
    isVeg: true,
    isBestSeller: false,
    discount: '13% OFF',
    image: '/images/garlic_pickle.png',
    shortDescription: 'Peeled garlic cloves marinated in spicy tamarind and aromatic ground spices.',
    description: 'Whole peeled garlic cloves infused with rich red chilli, tamarind pulp, and ground spices.',
    ingredients: ['Fresh Garlic Cloves', 'Tamarind Pulp', 'Red Chilli Powder', 'Groundnut Oil', 'Mustard', 'Asafoetida'],
    storageInfo: 'Store at room temperature in a dry jar.',
    shippingInfo: 'Packed in protective bubble wraps.'
  },
  {
    id: 'boneless-chicken-pickle',
    name: 'Special Boneless Chicken Pickle',
    category: 'non-veg',
    price: 549,
    oldPrice: 629,
    rating: 5.0,
    reviewsCount: 210,
    isVeg: false,
    isBestSeller: true,
    discount: '13% OFF',
    image: '/images/chicken_pickle.png',
    shortDescription: 'Deep-fried succulent tender chicken pieces cooked in spicy masala and ginger-garlic blend.',
    description: 'Made with fresh country chicken breast pieces, deep-fried to golden perfection and seasoned with roasted spices and lemon juice.',
    ingredients: ['Boneless Farm Chicken', 'Ginger-Garlic Paste', 'Guntur Chilli Powder', 'Garam Masala', 'Groundnut Oil', 'Lemon Juice', 'Curry Leaves'],
    storageInfo: 'Best stored in refrigerator. Consumed within 3 months of opening.',
    shippingInfo: 'Prepared fresh to order and shipped in insulated temperature-sealed packaging.'
  },
  {
    id: 'tangy-lemon-pickle',
    name: 'Sun-Cured Tangy Lemon Pickle',
    category: 'veg',
    price: 249,
    oldPrice: 289,
    rating: 4.7,
    reviewsCount: 76,
    isVeg: true,
    isBestSeller: false,
    discount: '14% OFF',
    image: '/images/mango_pickle.png',
    shortDescription: 'Naturally sun-ripened juicy lemons cured in sea salt and fenugreek spices.',
    description: 'Whole yellow lemons sun-cured over 21 days until soft and juicy, then seasoned with mustard and fenugreek powder.',
    ingredients: ['Sun-Cured Lemons', 'Red Chilli Powder', 'Fenugreek Powder', 'Turmeric', 'Sesame Oil', 'Rock Salt'],
    storageInfo: 'Store in dry place. Gets richer in flavor as it ages.',
    shippingInfo: 'Ships within 1-2 business days.'
  },
  {
    id: 'andhra-red-chilli-pickle',
    name: 'Fiery Andhra Red Chilli Pickle (Pandu Mirchi)',
    category: 'spicy',
    price: 299,
    oldPrice: 349,
    rating: 4.9,
    reviewsCount: 88,
    isVeg: true,
    isBestSeller: true,
    discount: '14% OFF',
    image: '/images/garlic_pickle.png',
    shortDescription: 'Ripe red chilli peppers ground with tamarind and roasted garlic.',
    description: 'Pandu Mirchi Pachadi is made from fresh ripe red chillies coarsely ground with tamarind, garlic, and hot sesame oil.',
    ingredients: ['Fresh Ripe Red Chillies', 'Tamarind', 'Garlic', 'Sesame Oil', 'Mustard', 'Salt'],
    storageInfo: 'Keep in dry jar.',
    shippingInfo: 'Express delivery available.'
  },
  {
    id: 'mixed-vegetable-pickle',
    name: 'Traditional Mixed Veg Pickle',
    category: 'traditional',
    price: 269,
    oldPrice: 299,
    rating: 4.6,
    reviewsCount: 64,
    isVeg: true,
    isBestSeller: false,
    discount: '10% OFF',
    image: '/images/gongura_pickle.png',
    shortDescription: 'Crunchy carrots, raw mangoes, green chillies, and ginger marinated in mustard oil.',
    description: 'A colorful medley of fresh garden vegetables tossed in tangy spices.',
    ingredients: ['Carrot', 'Raw Mango', 'Green Chilli', 'Ginger', 'Lemon', 'Mustard Oil', 'Spices'],
    storageInfo: 'Refrigerate after opening.',
    shippingInfo: 'Sealed jar delivery.'
  },
  {
    id: 'coastal-fish-pickle',
    name: 'Coastal Spicy Fish Pickle',
    category: 'non-veg',
    price: 599,
    oldPrice: 679,
    rating: 4.8,
    reviewsCount: 92,
    isVeg: false,
    isBestSeller: false,
    discount: '12% OFF',
    image: '/images/chicken_pickle.png',
    shortDescription: 'Deboned ocean fish fried in fragrant spices and tangy tamarind gravy.',
    description: 'Fresh coastal fish fillets cut into bite-sized pieces, crispy-fried, and preserved in authentic Andhra spice gravy.',
    ingredients: ['Deboned Fish Fillets', 'Tamarind', 'Red Chilli', 'Groundnut Oil', 'Fenugreek', 'Garlic', 'Spices'],
    storageInfo: 'Store in refrigerator. Consume within 60 days.',
    shippingInfo: 'Chilled express packaging.'
  }
];

export const ORDERS_DB = [];
export const PAYMENTS_DB = [];
export const USERS_DB = [];
export const CARTS_DB = [];
export const WISHLIST_DB = [];
export const NOTIFICATIONS_DB = [];

// MySQL Connection Pool Setup
let dbPool = null;

try {
  dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'anu_home_foods',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  dbPool.getConnection()
    .then(conn => {
      console.log('✅ MySQL Database Connected successfully');
      conn.release();
    })
    .catch(err => {
      console.warn('⚠️ MySQL connection notice:', err.message, '- Using in-memory fallback store.');
    });
} catch (err) {
  console.warn('⚠️ Could not initialize MySQL pool. Using in-memory repository layer.');
}

export const getDb = () => dbPool;

// =======================================================
// 1. Users & Authentication Repository
// =======================================================
export const findUserByEmail = async (email) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM users WHERE email = ?`, [email]);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('MySQL findUserByEmail error:', err.message);
    }
  }
  return USERS_DB.find(u => u.email === email);
};

export const createUserInDb = async (userData) => {
  if (dbPool) {
    try {
      const [res] = await dbPool.execute(
        `INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)`,
        [userData.name, userData.email, userData.password_hash, userData.phone || null, userData.role || 'CUSTOMER']
      );
      return { id: res.insertId, ...userData };
    } catch (err) {
      console.warn('MySQL createUser error:', err.message);
    }
  }

  const newUser = { id: USERS_DB.length + 1, ...userData };
  USERS_DB.push(newUser);
  return newUser;
};

// =======================================================
// 2. Products & Variants Repository
// =======================================================
export const getAllProductsFromDb = async () => {
  if (dbPool) {
    try {
      const [products] = await dbPool.execute(`SELECT * FROM products WHERE is_active = TRUE`);
      for (const p of products) {
        const [variants] = await dbPool.execute(`SELECT * FROM product_variants WHERE product_id = ? AND is_active = TRUE`, [p.id]);
        p.variants = variants;
      }
      return products;
    } catch (err) {
      console.warn('MySQL getAllProducts error:', err.message);
    }
  }
  return PRODUCTS_DB;
};

// =======================================================
// 3. Persistent Carts Repository
// =======================================================
export const getUserActiveCartFromDb = async (userId) => {
  if (dbPool) {
    try {
      let [carts] = await dbPool.execute(`SELECT * FROM carts WHERE user_id = ? AND status = 'ACTIVE'`, [userId]);
      let cart = carts[0];
      if (!cart) {
        const [res] = await dbPool.execute(`INSERT INTO carts (user_id, status) VALUES (?, 'ACTIVE')`, [userId]);
        cart = { id: res.insertId, user_id: userId, status: 'ACTIVE' };
      }
      const [items] = await dbPool.execute(
        `SELECT ci.*, p.name as product_name, p.image_url FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?`,
        [cart.id]
      );
      cart.items = items;
      return cart;
    } catch (err) {
      console.warn('MySQL getActiveCart error:', err.message);
    }
  }

  let cart = CARTS_DB.find(c => c.user_id === userId && c.status === 'ACTIVE');
  if (!cart) {
    cart = { id: CARTS_DB.length + 1, user_id: userId, status: 'ACTIVE', items: [] };
    CARTS_DB.push(cart);
  }
  return cart;
};

// =======================================================
// 4. Wishlist Repository
// =======================================================
export const getUserWishlistFromDb = async (userId) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(
        `SELECT w.*, p.name, p.base_price, p.image_url FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?`,
        [userId]
      );
      return rows;
    } catch (err) {
      console.warn('MySQL getWishlist error:', err.message);
    }
  }
  return WISHLIST_DB.filter(w => w.user_id === userId);
};

export const toggleWishlistItemInDb = async (userId, productId) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?`, [userId, productId]);
      if (rows.length > 0) {
        await dbPool.execute(`DELETE FROM wishlist WHERE id = ?`, [rows[0].id]);
        return { action: 'REMOVED', productId };
      } else {
        await dbPool.execute(`INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)`, [userId, productId]);
        return { action: 'ADDED', productId };
      }
    } catch (err) {
      console.warn('MySQL toggleWishlist error:', err.message);
    }
  }

  const index = WISHLIST_DB.findIndex(w => w.user_id === userId && w.product_id === productId);
  if (index >= 0) {
    WISHLIST_DB.splice(index, 1);
    return { action: 'REMOVED', productId };
  } else {
    WISHLIST_DB.push({ user_id: userId, product_id: productId });
    return { action: 'ADDED', productId };
  }
};

// =======================================================
// 5. Orders & Order Items Repository
// =======================================================
export const saveOrder = async (orderData) => {
  if (dbPool) {
    try {
      await dbPool.execute(
        `INSERT INTO orders 
        (order_id, user_id, customer_name, customer_email, customer_phone, delivery_address, subtotal, discount_amount, shipping_fee, total_amount, payment_method, payment_status, order_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderData.order_id,
          orderData.user_id || null,
          orderData.customer_name,
          orderData.customer_email,
          orderData.customer_phone,
          orderData.delivery_address,
          orderData.subtotal,
          orderData.discount_amount,
          orderData.shipping_fee,
          orderData.total_amount,
          orderData.payment_method,
          orderData.payment_status,
          orderData.order_status
        ]
      );

      if (orderData.items && orderData.items.length > 0) {
        for (const item of orderData.items) {
          await dbPool.execute(
            `INSERT INTO order_items (order_id, product_id, variant_id, product_name, variant_name, weight, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              orderData.order_id,
              item.product_id || item.id,
              item.variant_id || null,
              item.product_name || item.name,
              item.variant_name || item.weight || item.selectedWeight || '500g',
              item.weight || item.selectedWeight || '500g',
              item.quantity,
              item.unit_price || item.unitPrice,
              item.subtotal || item.total_price || ((item.unit_price || item.unitPrice) * item.quantity)
            ]
          );
        }
      }
      return orderData;
    } catch (err) {
      console.warn('MySQL saveOrder error, falling back to memory store:', err.message);
    }
  }

  ORDERS_DB.push(orderData);
  return orderData;
};

export const getOrderByIdFromDb = async (orderId) => {
  if (dbPool) {
    try {
      const [orders] = await dbPool.execute(`SELECT * FROM orders WHERE order_id = ?`, [orderId]);
      if (orders.length > 0) {
        const order = orders[0];
        const [items] = await dbPool.execute(`SELECT * FROM order_items WHERE order_id = ?`, [orderId]);
        order.items = items;
        return order;
      }
    } catch (err) {
      console.warn('MySQL getOrderById error:', err.message);
    }
  }
  return ORDERS_DB.find(o => o.order_id === orderId || o.orderId === orderId);
};

export const updateOrderPaymentStatusInDb = async (orderId, paymentStatus, orderStatus = null) => {
  if (dbPool) {
    try {
      if (orderStatus) {
        await dbPool.execute(
          `UPDATE orders SET payment_status = ?, order_status = ? WHERE order_id = ?`,
          [paymentStatus, orderStatus, orderId]
        );
      } else {
        await dbPool.execute(
          `UPDATE orders SET payment_status = ? WHERE order_id = ?`,
          [paymentStatus, orderId]
        );
      }
    } catch (err) {
      console.warn('MySQL updateOrder error:', err.message);
    }
  }

  const order = ORDERS_DB.find(o => o.order_id === orderId || o.orderId === orderId);
  if (order) {
    order.payment_status = paymentStatus;
    if (orderStatus) order.order_status = orderStatus;
  }
};

export const updateOrderStatusInDb = async (orderId, orderStatus, estimatedDelivery = null) => {
  if (dbPool) {
    try {
      if (estimatedDelivery) {
        await dbPool.execute(
          `UPDATE orders SET order_status = ?, estimated_delivery = ? WHERE order_id = ?`,
          [orderStatus, estimatedDelivery, orderId]
        );
      } else {
        await dbPool.execute(
          `UPDATE orders SET order_status = ? WHERE order_id = ?`,
          [orderStatus, orderId]
        );
      }
    } catch (err) {
      console.warn('MySQL updateOrderStatus error:', err.message);
    }
  }

  const order = ORDERS_DB.find(o => o.order_id === orderId || o.orderId === orderId);
  if (order) {
    order.order_status = orderStatus;
    if (estimatedDelivery) order.estimated_delivery = estimatedDelivery;
  }
};

export const getAllOrdersFromDb = async () => {
  if (dbPool) {
    try {
      const [orders] = await dbPool.execute(`SELECT * FROM orders ORDER BY created_at DESC`);
      for (const order of orders) {
        const [items] = await dbPool.execute(`SELECT * FROM order_items WHERE order_id = ?`, [order.order_id]);
        order.items = items;
        const [payments] = await dbPool.execute(`SELECT * FROM payments WHERE order_id = ? ORDER BY id DESC LIMIT 1`, [order.order_id]);
        if (payments.length > 0) {
          order.payment = payments[0];
        }
      }
      return orders;
    } catch (err) {
      console.warn('MySQL getAllOrders error:', err.message);
    }
  }
  return ORDERS_DB.map(o => {
    const payment = PAYMENTS_DB.find(p => p.order_id === (o.order_id || o.orderId));
    return { ...o, payment };
  });
};

// =======================================================
// 6. Payments Reconciliation Repository
// =======================================================
export const savePaymentRecord = async (paymentData) => {
  if (dbPool) {
    try {
      await dbPool.execute(
        `INSERT INTO payments 
        (order_id, user_id, gateway, gateway_order_id, gateway_payment_id, gateway_signature, amount, currency, status, signature_verified, failure_reason) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        status = VALUES(status), 
        gateway_payment_id = VALUES(gateway_payment_id), 
        gateway_signature = VALUES(gateway_signature),
        signature_verified = VALUES(signature_verified),
        failure_reason = VALUES(failure_reason)`,
        [
          paymentData.order_id,
          paymentData.user_id || null,
          paymentData.gateway || 'RAZORPAY',
          paymentData.gateway_order_id || null,
          paymentData.gateway_payment_id || null,
          paymentData.gateway_signature || null,
          paymentData.amount,
          paymentData.currency || 'INR',
          paymentData.status || 'CREATED',
          paymentData.signature_verified ? 1 : 0,
          paymentData.failure_reason || null
        ]
      );
      return paymentData;
    } catch (err) {
      console.warn('MySQL savePayment error:', err.message);
    }
  }

  const existingIdx = PAYMENTS_DB.findIndex(p => p.gateway_payment_id && p.gateway_payment_id === paymentData.gateway_payment_id);
  if (existingIdx >= 0) {
    PAYMENTS_DB[existingIdx] = { ...PAYMENTS_DB[existingIdx], ...paymentData };
  } else {
    PAYMENTS_DB.push(paymentData);
  }
  return paymentData;
};

export const getPaymentByGatewayOrderId = async (gatewayOrderId) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM payments WHERE gateway_order_id = ?`, [gatewayOrderId]);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('MySQL getPayment error:', err.message);
    }
  }
  return PAYMENTS_DB.find(p => p.gateway_order_id === gatewayOrderId);
};

export const getPaymentByOrderId = async (orderId) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM payments WHERE order_id = ? ORDER BY id DESC`, [orderId]);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('MySQL getPaymentByOrderId error:', err.message);
    }
  }
  return PAYMENTS_DB.slice().reverse().find(p => p.order_id === orderId);
};

// =======================================================
// 7. Delivery Zones Repository
// =======================================================
export const getDeliveryZoneByPincode = async (pincode) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM delivery_zones WHERE pincode = ? AND is_active = TRUE`, [pincode]);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('MySQL getDeliveryZone error:', err.message);
    }
  }
  return { zone_name: 'Local Andhra Delivery', pincode, delivery_fee: 50.00, estimated_hours: 48, bulk_free_delivery_threshold: 500.00 };
};

// =======================================================
// 8. Notifications Repository
// =======================================================
export const getUserNotificationsFromDb = async (userId) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.execute(`SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
      return rows;
    } catch (err) {
      console.warn('MySQL getNotifications error:', err.message);
    }
  }
  return NOTIFICATIONS_DB.filter(n => n.user_id === userId);
};

export const createNotificationInDb = async (notificationData) => {
  if (dbPool) {
    try {
      await dbPool.execute(
        `INSERT INTO notifications (user_id, order_id, type, title, message) VALUES (?, ?, ?, ?, ?)`,
        [notificationData.user_id, notificationData.order_id || null, notificationData.type, notificationData.title, notificationData.message]
      );
      return notificationData;
    } catch (err) {
      console.warn('MySQL createNotification error:', err.message);
    }
  }
  NOTIFICATIONS_DB.push(notificationData);
  return notificationData;
};
