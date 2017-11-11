var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var BreadcrumbItem = function (_Component) {
    _inherits(BreadcrumbItem, _Component);

    function BreadcrumbItem() {
        _classCallCheck(this, BreadcrumbItem);

        return _possibleConstructorReturn(this, (BreadcrumbItem.__proto__ || Object.getPrototypeOf(BreadcrumbItem)).apply(this, arguments));
    }

    _createClass(BreadcrumbItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                separator = _props.separator,
                children = _props.children,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'separator', 'children']);

            var link = void 0;
            if ('href' in this.props) {
                link = React.createElement(
                    'a',
                    Object.assign({ className: prefixCls + '-link' }, restProps),
                    children
                );
            } else {
                link = React.createElement(
                    'span',
                    Object.assign({ className: prefixCls + '-link' }, restProps),
                    children
                );
            }

            if (children) {
                return React.createElement(
                    'span',
                    null,
                    link,
                    React.createElement(
                        'span',
                        { className: prefixCls + '-separator' },
                        separator
                    )
                );
            }
            return null;
        }
    }]);

    return BreadcrumbItem;
}(Component);

BreadcrumbItem.defaultProps = {
    prefixCls: 'fy-breadcrumb',
    separator: '/'
};
BreadcrumbItem.propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string,
    children: PropTypes.node
};
export default BreadcrumbItem;