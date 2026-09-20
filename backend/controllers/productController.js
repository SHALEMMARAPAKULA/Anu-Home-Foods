import { PRODUCTS_DB } from '../config/db.js';

// Get All Products with filtering and sorting
export const getProducts = (req, res) => {
  const { category, search, sortBy } = req.query;
  let results = [...PRODUCTS_DB];

  // Category filter
  if (category && category !== 'all') {
    results = results.filter(p => p.category === category);
  }

  // Search filter
  if (search) {
    const query = search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sortBy === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
};

// Get Product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS_DB.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Pickle product not found' });
  }

  res.json({ success: true, data: product });
};

// Get Bestsellers
export const getBestsellers = (req, res) => {
  const bestsellers = PRODUCTS_DB.filter(p => p.isBestSeller);
  res.json({ success: true, count: bestsellers.length, data: bestsellers });
};
