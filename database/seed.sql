-- =======================================================
-- ANU HOME FOODS - Development Seed Dataset
-- Database: anu_home_foods
-- =======================================================

USE anu_home_foods;

-- Clear existing seed data safely
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE notifications;
TRUNCATE TABLE payments;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE wishlist;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE carts;
TRUNCATE TABLE delivery_zones;
TRUNCATE TABLE product_variants;
TRUNCATE TABLE products;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- -------------------------------------------------------
-- 1. Seed Users (Admin & Customer Accounts)
-- -------------------------------------------------------
INSERT INTO users (id, name, email, password_hash, phone, role, is_active) VALUES
(1, 'ANU Admin', 'admin@anuhomefoods.com', '$2b$10$YourHashedAdminPasswordHere', '9876543210', 'ADMIN', TRUE),
(2, 'Shalem Marapakula', 'shalem@example.com', '$2b$10$YourHashedCustomerPasswordHere', '9123456789', 'CUSTOMER', TRUE),
(3, 'Ramesh Kumar', 'ramesh@example.com', '$2b$10$YourHashedCustomerPasswordHere', '9876500000', 'CUSTOMER', TRUE);

-- -------------------------------------------------------
-- 2. Seed Products (Strictly Authentic Homemade Pickles)
-- -------------------------------------------------------
INSERT INTO products (id, name, category, base_price, old_price, rating, reviews_count, is_veg, is_bestseller, discount, image_url, short_description, description, ingredients, storage_info, shipping_info) VALUES
('andhra-mango-pickle', 'Andhra Avakaya Mango Pickle', 'veg', 299.00, 349.00, 4.9, 142, TRUE, TRUE, '14% OFF', '/images/mango_pickle.png', 'Authentic handcrafted cut mango pickle prepared with Guntur chilli and cold-pressed sesame oil.', 'Our signature Avakaya Mango Pickle is prepared in traditional Vijayawada style using sun-dried raw sour mangoes, hand-milled red chilli powder, mustard seeds, and pure unrefined sesame oil.', 'Raw Cut Mangoes, Red Chilli Powder, Mustard Powder, Garlic, Cold-Pressed Sesame Oil, Sea Salt, Fenugreek', 'Store in a cool, dry place. Always use a dry spoon. Keeps fresh for 12 months.', 'Ships within 24 hours in leak-proof sealed food-grade glass jars.'),

('authentic-gongura-pickle', 'Authentic Andhra Gongura Pickle', 'veg', 279.00, 319.00, 4.8, 98, TRUE, TRUE, '12% OFF', '/images/gongura_pickle.png', 'Tangy red sorrel leaf pickle roasted with garlic, coriander seeds, and sesame oil.', 'Gongura (Red Sorrel) is known as the pride of Andhra cuisine. Made by slow-roasting fresh organic Gongura leaves in garlic and ground spices.', 'Fresh Gongura Leaves, Garlic Cloves, Red Chilli, Sesame Oil, Coriander Seeds, Cumin, Sea Salt', 'Refrigerate after opening for extended freshness.', 'Dispatched in double-sealed airtight containers.'),

('spicy-garlic-pickle', 'Fiery Spicy Garlic Pickle', 'spicy', 329.00, 379.00, 4.9, 115, TRUE, FALSE, '13% OFF', '/images/garlic_pickle.png', 'Peeled garlic cloves marinated in spicy tamarind and aromatic ground spices.', 'Whole peeled garlic cloves infused with rich red chilli, tamarind pulp, and ground spices.', 'Fresh Garlic Cloves, Tamarind Pulp, Red Chilli Powder, Groundnut Oil, Mustard, Asafoetida', 'Store at room temperature in a dry jar.', 'Packed in protective bubble wraps.'),

('boneless-chicken-pickle', 'Special Boneless Chicken Pickle', 'non-veg', 549.00, 629.00, 5.0, 210, FALSE, TRUE, '13% OFF', '/images/chicken_pickle.png', 'Deep-fried succulent tender chicken pieces cooked in spicy masala and ginger-garlic blend.', 'Made with fresh country chicken breast pieces, deep-fried to golden perfection and seasoned with roasted spices and lemon juice.', 'Boneless Farm Chicken, Ginger-Garlic Paste, Guntur Chilli Powder, Garam Masala, Groundnut Oil, Lemon Juice, Curry Leaves', 'Best stored in refrigerator. Consumed within 3 months of opening.', 'Prepared fresh to order and shipped in insulated temperature-sealed packaging.'),

('tangy-lemon-pickle', 'Sun-Cured Tangy Lemon Pickle', 'veg', 249.00, 289.00, 4.7, 76, TRUE, FALSE, '14% OFF', '/images/mango_pickle.png', 'Naturally sun-ripened juicy lemons cured in sea salt and fenugreek spices.', 'Whole yellow lemons sun-cured over 21 days until soft and juicy, then seasoned with mustard and fenugreek powder.', 'Sun-Cured Lemons, Red Chilli Powder, Fenugreek Powder, Turmeric, Sesame Oil, Rock Salt', 'Store in dry place. Gets richer in flavor as it ages.', 'Ships within 1-2 business days.'),

('andhra-red-chilli-pickle', 'Fiery Andhra Red Chilli Pickle (Pandu Mirchi)', 'spicy', 299.00, 349.00, 4.9, 88, TRUE, TRUE, '14% OFF', '/images/garlic_pickle.png', 'Ripe red chilli peppers ground with tamarind and roasted garlic.', 'Pandu Mirchi Pachadi is made from fresh ripe red chillies coarsely ground with tamarind, garlic, and hot sesame oil.', 'Fresh Ripe Red Chillies, Tamarind, Garlic, Sesame Oil, Mustard, Salt', 'Keep in dry jar.', 'Express delivery available.'),

('mixed-vegetable-pickle', 'Traditional Mixed Veg Pickle', 'traditional', 269.00, 299.00, 4.6, 64, TRUE, FALSE, '10% OFF', '/images/gongura_pickle.png', 'Crunchy carrots, raw mangoes, green chillies, and ginger marinated in mustard oil.', 'A colorful medley of fresh garden vegetables tossed in tangy spices.', 'Carrot, Raw Mango, Green Chilli, Ginger, Lemon, Mustard Oil, Spices', 'Refrigerate after opening.', 'Sealed jar delivery.'),

('coastal-fish-pickle', 'Coastal Spicy Fish Pickle', 'non-veg', 599.00, 679.00, 4.8, 92, FALSE, FALSE, '12% OFF', '/images/chicken_pickle.png', 'Deboned ocean fish fried in fragrant spices and tangy tamarind gravy.', 'Fresh coastal fish fillets cut into bite-sized pieces, crispy-fried, and preserved in authentic Andhra spice gravy.', 'Deboned Fish Fillets, Tamarind, Red Chilli, Groundnut Oil, Fenugreek, Garlic, Spices', 'Store in refrigerator. Consume within 60 days.', 'Chilled express packaging.');

-- -------------------------------------------------------
-- 3. Seed Product Variants (Weight Options & Pricing)
-- -------------------------------------------------------
INSERT INTO product_variants (product_id, variant_name, price, stock_quantity, sku) VALUES
-- Andhra Mango Pickle Variants
('andhra-mango-pickle', '250g', 169.00, 150, 'AHF-MANGO-250G'),
('andhra-mango-pickle', '500g', 299.00, 200, 'AHF-MANGO-500G'),
('andhra-mango-pickle', '1kg',  569.00, 100, 'AHF-MANGO-1KG'),

-- Authentic Gongura Pickle Variants
('authentic-gongura-pickle', '250g', 159.00, 120, 'AHF-GONGURA-250G'),
('authentic-gongura-pickle', '500g', 279.00, 180, 'AHF-GONGURA-500G'),
('authentic-gongura-pickle', '1kg',  529.00, 80,  'AHF-GONGURA-1KG'),

-- Spicy Garlic Pickle Variants
('spicy-garlic-pickle', '250g', 179.00, 100, 'AHF-GARLIC-250G'),
('spicy-garlic-pickle', '500g', 329.00, 140, 'AHF-GARLIC-500G'),
('spicy-garlic-pickle', '1kg',  619.00, 60,  'AHF-GARLIC-1KG'),

-- Special Boneless Chicken Pickle Variants
('boneless-chicken-pickle', '250g', 319.00, 100, 'AHF-CHICKEN-250G'),
('boneless-chicken-pickle', '500g', 549.00, 150, 'AHF-CHICKEN-500G'),
('boneless-chicken-pickle', '1kg',  1049.00, 50, 'AHF-CHICKEN-1KG'),

-- Tangy Lemon Pickle Variants
('tangy-lemon-pickle', '250g', 139.00, 90,  'AHF-LEMON-250G'),
('tangy-lemon-pickle', '500g', 249.00, 130, 'AHF-LEMON-500G'),
('tangy-lemon-pickle', '1kg',  469.00, 70,  'AHF-LEMON-1KG'),

-- Fiery Red Chilli Pickle Variants
('andhra-red-chilli-pickle', '250g', 169.00, 110, 'AHF-REDCHILLI-250G'),
('andhra-red-chilli-pickle', '500g', 299.00, 160, 'AHF-REDCHILLI-500G'),
('andhra-red-chilli-pickle', '1kg',  569.00, 90,  'AHF-REDCHILLI-1KG'),

-- Mixed Veg Pickle Variants
('mixed-vegetable-pickle', '250g', 149.00, 80,  'AHF-MIXVEG-250G'),
('mixed-vegetable-pickle', '500g', 269.00, 120, 'AHF-MIXVEG-500G'),
('mixed-vegetable-pickle', '1kg',  499.00, 60,  'AHF-MIXVEG-1KG'),

-- Coastal Fish Pickle Variants
('coastal-fish-pickle', '250g', 349.00, 70,  'AHF-FISH-250G'),
('coastal-fish-pickle', '500g', 599.00, 100, 'AHF-FISH-500G'),
('coastal-fish-pickle', '1kg',  1149.00, 40, 'AHF-FISH-1KG');

-- -------------------------------------------------------
-- 4. Seed Delivery Zones
-- -------------------------------------------------------
INSERT INTO delivery_zones (zone_name, pincode, delivery_fee, estimated_hours, bulk_free_delivery_threshold) VALUES
('Vijayawada Central', '520001', 0.00, 24, 500.00),
('Guntur Urban', '522002', 40.00, 24, 500.00),
('Narasaraopet Local', '522439', 50.00, 48, 500.00),
('Visakhapatnam Metro', '530001', 50.00, 48, 500.00),
('Hyderabad Metro', '500001', 50.00, 48, 500.00),
('Tirupati Temple Zone', '517501', 60.00, 72, 600.00);

-- -------------------------------------------------------
-- 5. Seed Carts & Cart Items
-- -------------------------------------------------------
INSERT INTO carts (id, user_id, status) VALUES
(1, 2, 'ACTIVE');

INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, unit_price) VALUES
(1, 'andhra-mango-pickle', 2, 2, 299.00),
(1, 'boneless-chicken-pickle', 11, 1, 549.00);

-- -------------------------------------------------------
-- 6. Seed Wishlist
-- -------------------------------------------------------
INSERT INTO wishlist (user_id, product_id) VALUES
(2, 'authentic-gongura-pickle'),
(2, 'coastal-fish-pickle');

-- -------------------------------------------------------
-- 7. Seed Sample Orders
-- -------------------------------------------------------
INSERT INTO orders (id, order_id, user_id, customer_name, customer_email, customer_phone, delivery_address, subtotal, shipping_fee, discount_amount, total_amount, payment_method, payment_status, order_status, estimated_delivery) VALUES
(1, 'AHF-892104', 2, 'Shalem Marapakula', 'shalem@example.com', '9123456789', 'Door No 4-12, VP South, Narasaraopet, Guntur - 522439', 848.00, 0.00, 0.00, 848.00, 'ONLINE', 'SUCCESS', 'ACCEPTED', 'Within 48 hours. Delivery time may vary depending on distance.');

INSERT INTO order_items (order_id, product_id, variant_id, product_name, variant_name, weight, quantity, unit_price, total_price) VALUES
('AHF-892104', 'andhra-mango-pickle', 2, 'Andhra Avakaya Mango Pickle', '500g', '500g', 1, 299.00, 299.00),
('AHF-892104', 'boneless-chicken-pickle', 11, 'Special Boneless Chicken Pickle', '500g', '500g', 1, 549.00, 549.00);

-- -------------------------------------------------------
-- 8. Seed Sample Payment Reconciliation Record
-- -------------------------------------------------------
INSERT INTO payments (order_id, user_id, gateway, gateway_order_id, gateway_payment_id, gateway_signature, amount, currency, payment_method, status, signature_verified) VALUES
('AHF-892104', 2, 'RAZORPAY', 'order_Nmx9201948', 'pay_Nmx9201999', 'a8f9c1023948571029384756', 848.00, 'INR', 'UPI', 'SUCCESS', TRUE);

-- -------------------------------------------------------
-- 9. Seed Sample Notifications
-- -------------------------------------------------------
INSERT INTO notifications (user_id, order_id, type, title, message, is_read) VALUES
(2, 'AHF-892104', 'ORDER_ACCEPTED', 'Order #AHF-892104 Accepted! 🎉', 'Your freshly prepared homemade pickle order has been accepted and will be delivered within 48 hours.', FALSE);
