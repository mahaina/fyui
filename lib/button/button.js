var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';

var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
    // Check the child if is undefined or null.
    if (child == null) {
        return;
    }
    var SPACE = needInserted ? ' ' : '';
    // strictNullChecks oops.
    if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
    }
    if (typeof child === 'string') {
        if (isTwoCNChar(child)) {
            child = child.split('').join(SPACE);
        }
        return React.createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_Component) {
    _inherits(Button, _Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.handleClick = function (e) {
            // Add click effect
            _this.setState({ clicked: true });
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
                return _this.setState({ clicked: false });
            }, 500);

            var onClick = _this.props.onClick;
            if (onClick) {
                onClick(e);
            }
        };

        _this.state = {
            loading: props.loading,
            clicked: false
        };
        return _this;
    }

    _createClass(Button, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var currentLoading = this.props.loading;
            var loading = nextProps.loading;

            if (currentLoading) {
                clearTimeout(this.delayTimeout);
            }

            if (typeof loading !== 'boolean' && loading && loading.delay) {
                this.delayTimeout = setTimeout(function () {
                    return _this2.setState({ loading: loading });
                }, loading.delay);
            } else {
                this.setState({ loading: loading });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                type = _props.type,
                shape = _props.shape,
                size = _props.size,
                className = _props.className,
                htmlType = _props.htmlType,
                children = _props.children,
                icon = _props.icon,
                prefixCls = _props.prefixCls,
                ghost = _props.ghost,
                others = _objectWithoutProperties(_props, ['type', 'shape', 'size', 'className', 'htmlType', 'children', 'icon', 'prefixCls', 'ghost']);

            var _state = this.state,
                loading = _state.loading,
                clicked = _state.clicked;

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

            var classes = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-' + type, type), _defineProperty(_classNames, prefixCls + '-' + shape, shape), _defineProperty(_classNames, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_classNames, prefixCls + '-icon-only', !children && icon), _defineProperty(_classNames, prefixCls + '-loading', loading), _defineProperty(_classNames, prefixCls + '-clicked', clicked), _defineProperty(_classNames, prefixCls + '-background-ghost', ghost), _classNames));

            var iconType = loading ? 'loading' : icon;
            var iconNode = iconType ? React.createElement(Icon, { type: iconType }) : null;
            var needInserted = React.Children.count(children) === 1 && (!iconType || iconType === 'loading');
            var kids = React.Children.map(children, function (child) {
                return insertSpace(child, needInserted);
            });

            return React.createElement(
                'button',
                Object.assign({}, omit(others, ['loading']), {
                    type: htmlType || 'button',
                    className: classes,
                    onClick: this.handleClick
                }),
                iconNode,
                kids
            );
        }
    }]);

    return Button;
}(Component);

Button.__FY_BUTTON = true;
Button.defaultProps = {
    prefixCls: 'fy-btn',
    loading: false,
    ghost: false
};
Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger']),
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(['large', 'small']),
    className: PropTypes.string,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    children: PropTypes.node,
    icon: PropTypes.string,
    prefixCls: PropTypes.string,
    ghost: PropTypes.bool,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        delay: PropTypes.number
    })]),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func
};
export default Button;