import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search__wrapper'>
      <input
        type='search'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search'
      />
    </div>
  );
};

export default SearchBar;
