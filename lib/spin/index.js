var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import Icon from '../icon';

var Spin = function (_Component) {
    _inherits(Spin, _Component);

    function Spin(props) {
        _classCallCheck(this, Spin);

        var _this = _possibleConstructorReturn(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).call(this, props));

        var spinning = props.spinning;
        _this.state = { spinning: spinning };
        return _this;
    }

    _createClass(Spin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!isCssAnimationSupported()) {
                // Show text in IE8/9
                /* eslint-disable react/no-did-mount-set-state */
                this.setState({ notCssAnimationSupported: true });
                /* eslint-enable react/no-did-mount-set-state */
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var currentSpinning = this.props.spinning;
            var spinning = nextProps.spinning;
            var delay = this.props.delay;


            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            if (currentSpinning && !spinning) {
                this.debounceTimeout = setTimeout(function () {
                    return _this2.setState({ spinning: spinning });
                }, 200);
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                /* eslint-disable no-restricted-globals */
            } else if (spinning && delay && !isNaN(Number(delay))) {
                /* eslint-enable no-restricted-globals */
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                this.delayTimeout = setTimeout(function () {
                    return _this2.setState({ spinning: spinning });
                }, delay);
            } else {
                this.setState({ spinning: spinning });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
    }, {
        key: 'isNestedPattern',
        value: function isNestedPattern() {
            return !!(this.props && this.props.children);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                className = _props.className,
                size = _props.size,
                prefixCls = _props.prefixCls,
                tip = _props.tip,
                wrapperClassName = _props.wrapperClassName,
                restProps = _objectWithoutProperties(_props, ['className', 'size', 'prefixCls', 'tip', 'wrapperClassName']);

            var _state = this.state,
                spinning = _state.spinning,
                notCssAnimationSupported = _state.notCssAnimationSupported;


            var spinClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-spinning', spinning), _defineProperty(_classNames, prefixCls + '-show-text', !!tip || notCssAnimationSupported), _classNames), className);

            // fix https://fb.me/react-unknown-prop
            var divProps = omit(restProps, ['spinning', 'delay']);

            var spinElement = React.createElement(
                'div',
                Object.assign({}, divProps, { className: spinClassName }),
                React.createElement(Icon, { className: prefixCls + '-icon', type: 'loading' }),
                tip ? React.createElement(
                    'div',
                    { className: prefixCls + '-text' },
                    tip
                ) : null
            );
            if (this.isNestedPattern()) {
                var _classNames2;

                var animateClassName = prefixCls + '-nested-loading';
                if (wrapperClassName) {
                    animateClassName += ' ' + wrapperClassName;
                }
                var containerClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-container', true), _defineProperty(_classNames2, prefixCls + '-blur', spinning), _classNames2));
                return React.createElement(
                    Animate,
                    Object.assign({}, divProps, {
                        component: 'div',
                        className: animateClassName,
                        style: null,
                        transitionName: 'fade'
                    }),
                    spinning && React.createElement(
                        'div',
                        { key: 'loading' },
                        spinElement
                    ),
                    React.createElement(
                        'div',
                        { className: containerClassName, key: 'container' },
                        this.props.children
                    )
                );
            }
            return spinElement;
        }
    }]);

    return Spin;
}(Component);

Spin.defaultProps = {
    prefixCls: 'fy-spin',
    spinning: true,
    size: 'default',
    wrapperClassName: ''
};
Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    children: PropTypes.node,
    delay: PropTypes.number,
    tip: PropTypes.string
};
export default Spin;