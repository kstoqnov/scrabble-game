import React from 'react';

const Card = (props) => {
  let heading = null;
  if (props.heading !== undefined && props.heading !== null) {
    heading = <h1>{props.heading}</h1>;
  } 
  return (
    <div className={`${ props.className }`}>
      {heading}
      {props.children}
    </div>
  );
}

export default Card;