import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-title">{category.name}</h3>
      <p className="category-desc">{category.description}</p>
      <Link
        to={`/shop?category=${category.id}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--chili-red)',
          fontWeight: 700,
          fontSize: '0.94rem'
        }}
      >
        Explore Pickles <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default CategoryCard;
