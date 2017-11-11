var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';

var Breadcrumb = function (_Component) {
    _inherits(Breadcrumb, _Component);

    function Breadcrumb() {
        _classCallCheck(this, Breadcrumb);

        return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
    }

    _createClass(Breadcrumb, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                separator = _props.separator,
                prefixCls = _props.prefixCls,
                style = _props.style,
                className = _props.className,
                children = _props.children;


            var crumbs = React.Children.map(children, function (element, index) {
                if (!element) {
                    return element;
                }
                warning(element.type && element.type.__FY_BREADCRUMB_ITEM, 'Breadcrumb only accepts Breadcrumb.Item as it\'s children');
                return cloneElement(element, {
                    separator: separator,
                    key: index
                });
            });

            return React.createElement(
                'div',
                { className: classNames(className, prefixCls), style: style },
                crumbs
            );
        }
    }]);

    return Breadcrumb;
}(Component);

Breadcrumb.defaultProps = {
    prefixCls: 'fy-breadcrumb',
    separator: '/'
};
Breadcrumb.propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};
export default Breadcrumb;