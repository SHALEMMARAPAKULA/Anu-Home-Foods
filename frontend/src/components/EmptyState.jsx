import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyState = ({ title = 'No Pickles Found', message = 'Try exploring our pickle collection.', actionText = 'Browse All Pickles', actionLink = '/shop' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', margin: '20px 0' }}>
      <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: 'var(--chili-red)' }}>
        <ShoppingBag size={32} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--dark-brown)', marginBottom: '10px' }}>
        {title}
      </h3>
      <p style={{ color: '#776a5c', maxWidth: '400px', margin: '0 auto 25px auto' }}>
        {message}
      </p>
      {actionLink && (
        <Link to={actionLink} className="btn-primary-gradient" style={{ padding: '12px 28px' }}>
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
