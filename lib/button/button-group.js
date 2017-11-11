function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ButtonGroup(props) {
    var _props$prefixCls = props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'fy-btn-group' : _props$prefixCls,
        size = props.size,
        className = props.className,
        others = _objectWithoutProperties(props, ['prefixCls', 'size', 'className']);

    // large => lg
    // small => sm


    var sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    }

    var classes = classNames(prefixCls, _defineProperty({}, prefixCls + '-' + sizeCls, sizeCls), className);

    return React.createElement('div', Object.assign({}, others, { className: classes }));
}

ButtonGroup.propTypes = {
    size: PropTypes.oneOf(['large', 'small']),
    style: PropTypes.object,
    className: PropTypes.string,
    prefixCls: PropTypes.string
};