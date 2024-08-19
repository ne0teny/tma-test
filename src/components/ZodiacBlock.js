import React from 'react';

const ZodiacBlock = ({ name, period, icon, onClick }) => (
  <div className="zodiac-block" onClick={onClick}>
    <img src={icon} alt={name} />
    <h3>{name}</h3>
    <p>{period}</p>
  </div>
);

export default ZodiacBlock;
