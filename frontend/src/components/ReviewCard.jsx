import React from 'react';
import { Quote } from 'lucide-react';
import Rating from './Rating';

const ReviewCard = ({ review }) => {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--border-radius)',
      padding: '26px',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative'
    }}>
      <Quote size={28} color="var(--mustard-gold)" style={{ opacity: 0.4, marginBottom: '10px' }} />
      <Rating rating={review.rating} />
      <p style={{ color: '#4a3e32', fontStyle: 'italic', fontSize: '1rem', margin: '14px 0', lineHeight: '1.6' }}>
        "{review.comment}"
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <div>
          <h4 style={{ fontWeight: 700, color: 'var(--dark-brown)' }}>{review.name}</h4>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>{review.location}</span>
        </div>
        <span style={{ fontSize: '0.78rem', background: 'var(--cream)', color: 'var(--pickle-green)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
          {review.pickleBought}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
