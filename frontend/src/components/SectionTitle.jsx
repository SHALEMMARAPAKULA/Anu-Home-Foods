import React from 'react';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div style={{ textAlign: centered ? 'center' : 'left', marginBottom: '35px' }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2.4rem',
        color: 'var(--dark-brown)',
        fontWeight: 800
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: '#665a4e', fontSize: '1.05rem', marginTop: '6px' }}>
          {subtitle}
        </p>
      )}
      <div className="section-divider" style={{ margin: centered ? '14px auto 0 auto' : '14px 0 0 0' }}></div>
    </div>
  );
};

export default SectionTitle;
