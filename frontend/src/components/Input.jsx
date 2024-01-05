import React from 'react';

const Input = ({ id, placeholder, type, value, change }) => (
    <div className="form-group">
    <input type={type} className="form-control" name={id} id={ id } placeholder={ placeholder } value={value} onChange={ (e) => change(e) } required />
  </div>
)

export default Input