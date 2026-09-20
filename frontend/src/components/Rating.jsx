import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating = 5, reviewsCount = 0 }) => {
  return (
    <div className="rating-wrapper">
      <div className="stars" style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={star <= Math.round(rating) ? '#E5A523' : 'none'}
            color={star <= Math.round(rating) ? '#E5A523' : '#ccc'}
          />
        ))}
      </div>
      <span style={{ fontWeight: 700, color: 'var(--dark-brown)' }}>{rating}</span>
      {reviewsCount > 0 && <span className="reviews-count">({reviewsCount})</span>}
    </div>
  );
};

export default Rating;
