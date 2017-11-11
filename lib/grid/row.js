var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

var Row = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                type = _props.type,
                justify = _props.justify,
                align = _props.align,
                className = _props.className,
                gutter = _props.gutter,
                style = _props.style,
                children = _props.children,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'fy-row' : _props$prefixCls,
                others = _objectWithoutProperties(_props, ['type', 'justify', 'align', 'className', 'gutter', 'style', 'children', 'prefixCls']);

            var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, !type), _defineProperty(_classNames, prefixCls + '-' + type, type), _defineProperty(_classNames, prefixCls + '-' + type + '-' + justify, type && justify), _defineProperty(_classNames, prefixCls + '-' + type + '-' + align, type && align), _classNames), className);
            var rowStyle = gutter > 0 ? Object.assign({
                marginLeft: gutter / -2,
                marginRight: gutter / -2
            }, style) : style;
            var cols = Children.map(children, function (col) {
                if (!col) {
                    return null;
                }
                if (col.props && gutter > 0) {
                    return cloneElement(col, {
                        style: Object.assign({
                            paddingLeft: gutter / 2,
                            paddingRight: gutter / 2
                        }, col.props.style)
                    });
                }
                return col;
            });
            return React.createElement(
                'div',
                Object.assign({}, others, { className: classes, style: rowStyle }),
                cols
            );
        }
    }]);

    return Row;
}(Component);

Row.defaultProps = {
    gutter: 0
};
Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.number,
    prefixCls: PropTypes.string,
    style: PropTypes.object
};
export default Row;