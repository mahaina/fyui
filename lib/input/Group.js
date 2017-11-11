function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Group(props) {
    var _classNames;

    var _props$prefixCls = props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'fy-input-group' : _props$prefixCls,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className;

    var cls = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', props.size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', props.size === 'small'), _defineProperty(_classNames, prefixCls + '-compact', props.compact), _classNames), className);
    return React.createElement(
        'span',
        { className: cls, style: props.style },
        props.children
    );
}

Group.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['large', 'small', 'default']),
    children: PropTypes.node,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    compact: PropTypes.bool
};