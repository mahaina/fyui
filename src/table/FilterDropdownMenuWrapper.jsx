import React from 'react';

/* eslint-disable react/prop-types */
export default props => (
    <div className={props.className} onClick={props.onClick}>
        {props.children}
    </div>
);
