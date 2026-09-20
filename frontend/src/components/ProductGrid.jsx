import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return <EmptyState title="No Pickles Found" message="Try resetting your search or filter options to explore our pickle catalog." />;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
