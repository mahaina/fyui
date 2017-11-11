var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Input);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Input, [{
        key: 'getInputClassName',
        value: function getInputClassName() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                size = _props.size,
                disabled = _props.disabled;

            return classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.refs.input.focus();
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.refs.input.blur();
        }
    }, {
        key: 'renderLabeledInput',
        value: function renderLabeledInput(children) {
            var props = this.props;
            // Not wrap when there is not addons
            if (!props.addonBefore && !props.addonAfter) {
                return children;
            }

            var wrapperClassName = props.prefixCls + '-group';
            var addonClassName = wrapperClassName + '-addon';
            var addonBefore = props.addonBefore ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonBefore
            ) : null;
            var addonAfter = props.addonAfter ? React.createElement(
                'span',
                { className: addonClassName },
                props.addonAfter
            ) : null;
            var className = classNames(props.prefixCls + '-wrapper', _defineProperty({}, wrapperClassName, addonBefore || addonAfter));
            // Need another wrapper for changing display:table to display:inline-block
            // and put style prop in wrapper
            if (addonBefore || addonAfter) {
                return React.createElement(
                    'span',
                    { className: props.prefixCls + '-group-wrapper', style: props.style },
                    React.createElement(
                        'span',
                        { className: className },
                        addonBefore,
                        cloneElement(children, { style: null }),
                        addonAfter
                    )
                );
            }
            return React.createElement(
                'span',
                { className: className },
                addonBefore,
                children,
                addonAfter
            );
        }
    }, {
        key: 'renderLabeledIcon',
        value: function renderLabeledIcon(children) {
            var props = this.props;

            if (!('prefix' in props || 'suffix' in props)) {
                return children;
            }

            var prefix = props.prefix ? React.createElement(
                'span',
                { className: props.prefixCls + '-prefix' },
                props.prefix
            ) : null;
            var suffix = props.suffix ? React.createElement(
                'span',
                { className: props.prefixCls + '-suffix' },
                props.suffix
            ) : null;

            return React.createElement(
                'span',
                { className: classNames(props.className, props.prefixCls + '-affix-wrapper'), style: props.style },
                prefix,
                cloneElement(children, { style: null, className: this.getInputClassName() }),
                suffix
            );
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _props2 = this.props,
                value = _props2.value,
                className = _props2.className;
            // Fix https://fb.me/react-unknown-prop

            var otherProps = omit(this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix']);

            if ('value' in this.props) {
                otherProps.value = fixControlledValue(value);
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                delete otherProps.defaultValue;
            }
            return this.renderLabeledIcon(React.createElement('input', Object.assign({}, otherProps, {
                className: classNames(this.getInputClassName(), className),
                onKeyDown: this.handleKeyDown,
                ref: 'input'
            })));
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.type === 'textarea') {
                return React.createElement(TextArea, Object.assign({}, this.props, { ref: 'input' }));
            }
            return this.renderLabeledInput(this.renderInput());
        }
    }]);

    return Input;
}(Component);

Input.defaultProps = {
    prefixCls: 'fy-input',
    type: 'text',
    disabled: false
};
Input.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    maxLength: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    autoComplete: PropTypes.string,
    spellCheck: PropTypes.bool,
    autoFocus: PropTypes.bool
};
export default Input;