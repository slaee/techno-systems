import React from 'react';
import PropTypes from 'prop-types';

import { InputText } from 'primereact/inputtext';

import './index.scss';

function Search({ value, onChange }) {
  return (
    <InputText className="search-input" placeholder="Search" value={value} onChange={onChange} />
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
