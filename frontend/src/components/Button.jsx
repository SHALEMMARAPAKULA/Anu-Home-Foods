import React from 'react';

const Button = ({ children, variant = 'primary', size = 'medium', className = '', ...props }) => {
  let btnClass = 'btn-primary-gradient';
  if (variant === 'secondary') btnClass = 'btn-secondary-outline';
  if (variant === 'gold') btnClass = 'btn-gold';

  return (
    <button className={`${btnClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
