function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';

export default function Icon(props) {
    var type = props.type,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className,
        spin = props.spin;

    var classString = classNames(_defineProperty({
        fyicon: true,
        'fyicon-spin': !!spin || type === 'loading'
    }, 'fyicon-' + type, true), className);
    return React.createElement('i', Object.assign({}, omit(props, ['type', 'spin']), { className: classString }));
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    spin: PropTypes.bool,
    style: PropTypes.object
};