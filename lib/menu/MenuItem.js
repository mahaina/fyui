var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var inlineCollapsed = this.context.inlineCollapsed;

            var props = this.props;
            return React.createElement(
                Tooltip,
                {
                    title: inlineCollapsed && props.level === 1 ? props.children : '',
                    placement: 'right',
                    overlayClassName: props.rootPrefixCls + '-inline-collapsed-tooltip'
                },
                React.createElement(Item, props)
            );
        }
    }]);

    return MenuItem;
}(Component);

MenuItem.contextTypes = {
    inlineCollapsed: PropTypes.bool
};
MenuItem.isMenuItem = 1;
export default MenuItem;