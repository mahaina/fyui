var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
var objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

var Col = function Col(props) {
    var _classNames;

    var span = props.span,
        order = props.order,
        offset = props.offset,
        push = props.push,
        pull = props.pull,
        className = props.className,
        children = props.children,
        _props$prefixCls = props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'fy-col' : _props$prefixCls,
        others = _objectWithoutProperties(props, ['span', 'order', 'offset', 'push', 'pull', 'className', 'children', 'prefixCls']);

    var sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(function (size) {
        var _Object$assign;

        var sizeProps = {};
        if (typeof props[size] === 'number') {
            sizeProps.span = props[size];
        } else if (_typeof(props[size]) === 'object') {
            sizeProps = props[size] || {};
        }

        delete others[size];

        sizeClassObj = Object.assign({}, sizeClassObj, (_Object$assign = {}, _defineProperty(_Object$assign, prefixCls + '-' + size + '-' + sizeProps.span, sizeProps.span !== undefined), _defineProperty(_Object$assign, prefixCls + '-' + size + '-order-' + sizeProps.order, sizeProps.order || sizeProps.order === 0), _defineProperty(_Object$assign, prefixCls + '-' + size + '-offset-' + sizeProps.offset, sizeProps.offset || sizeProps.offset === 0), _defineProperty(_Object$assign, prefixCls + '-' + size + '-push-' + sizeProps.push, sizeProps.push || sizeProps.push === 0), _defineProperty(_Object$assign, prefixCls + '-' + size + '-pull-' + sizeProps.pull, sizeProps.pull || sizeProps.pull === 0), _Object$assign));
    });
    var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + span, span !== undefined), _defineProperty(_classNames, prefixCls + '-order-' + order, order), _defineProperty(_classNames, prefixCls + '-offset-' + offset, offset), _defineProperty(_classNames, prefixCls + '-push-' + push, push), _defineProperty(_classNames, prefixCls + '-pull-' + pull, pull), _classNames), className, sizeClassObj);

    return React.createElement(
        'div',
        Object.assign({}, others, { className: classes }),
        children
    );
};

Col.propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
    prefixCls: PropTypes.string
};

export default Col;