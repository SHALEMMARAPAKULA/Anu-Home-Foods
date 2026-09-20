import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = 'Search pickles (e.g. Mango, Garlic, Chicken)...' }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <Search
        size={18}
        color="#7a6b5d"
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 40px 12px 42px',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-pill)',
          background: 'var(--white)',
          fontSize: '0.95rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#888'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
