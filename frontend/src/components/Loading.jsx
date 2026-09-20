import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', width: '100%' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          height: '340px',
          background: 'linear-gradient(90deg, #f0e6d6 25%, #f8f1e6 50%, #f0e6d6 75%)',
          backgroundSize: '200% 100%',
          borderRadius: 'var(--border-radius)',
          animation: 'shimmer 1.5s infinite'
        }} />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Loading;
