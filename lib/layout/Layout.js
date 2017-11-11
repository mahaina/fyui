var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classNames from 'classnames';

/* eslint-disable react/prop-types,react/prefer-stateless-function */
function generator(props) {
    return function (BacicComponent) {
        return function (_Component) {
            _inherits(Adapter, _Component);

            function Adapter() {
                _classCallCheck(this, Adapter);

                return _possibleConstructorReturn(this, (Adapter.__proto__ || Object.getPrototypeOf(Adapter)).apply(this, arguments));
            }

            _createClass(Adapter, [{
                key: 'render',
                value: function render() {
                    var prefixCls = props.prefixCls;

                    return React.createElement(BacicComponent, Object.assign({ prefixCls: prefixCls }, this.props));
                }
            }]);

            return Adapter;
        }(Component);
    };
}

var Basic = function Basic(props) {
    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        others = _objectWithoutProperties(props, ['prefixCls', 'className', 'children']);

    var hasSider = void 0;
    React.Children.forEach(children, function (element) {
        if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
            hasSider = true;
        }
    });
    var divCls = classNames(className, prefixCls, _defineProperty({}, prefixCls + '-has-sider', hasSider));
    return React.createElement(
        'div',
        Object.assign({ className: divCls }, others),
        children
    );
};
/* eslint-enable react/prop-types,react/prefer-stateless-function */

var Layout = generator({
    prefixCls: 'fy-layout'
})(Basic);

var Header = generator({
    prefixCls: 'fy-layout-header'
})(Basic);

var Footer = generator({
    prefixCls: 'fy-layout-footer'
})(Basic);

var Content = generator({
    prefixCls: 'fy-layout-content'
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;