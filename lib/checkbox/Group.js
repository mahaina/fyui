var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Checkbox from './Checkbox';

var CheckboxValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

var CheckboxOptionType = PropTypes.shape({
    label: PropTypes.string,
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

var CheckboxGroup = function (_Component) {
    _inherits(CheckboxGroup, _Component);

    function CheckboxGroup(props) {
        _classCallCheck(this, CheckboxGroup);

        var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

        _this.toggleOption = function (option) {
            var optionIndex = _this.state.value.indexOf(option.value);
            var value = [].concat(_toConsumableArray(_this.state.value));
            if (optionIndex === -1) {
                value.push(option.value);
            } else {
                value.splice(optionIndex, 1);
            }
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value);
            }
        };

        _this.state = {
            value: props.value || props.defaultValue || []
        };
        return _this;
    }

    _createClass(CheckboxGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                checkboxGroup: {
                    toggleOption: this.toggleOption,
                    value: this.state.value,
                    disabled: this.props.disabled
                }
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({ value: nextProps.value || [] });
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var options = this.props.options;
            // https://github.com/Microsoft/TypeScript/issues/7960

            return options.map(function (option) {
                if (typeof option === 'string') {
                    return {
                        label: option,
                        value: option
                    };
                }
                return option;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var state = this.state;
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                options = _props.options,
                disabled = _props.disabled;

            var children = this.props.children;
            if (options && options.length > 0) {
                children = this.getOptions().map(function (option) {
                    return React.createElement(
                        Checkbox,
                        {
                            key: option.value,
                            disabled: 'disabled' in option ? option.disabled : disabled,
                            value: option.value,
                            checked: state.value.indexOf(option.value) !== -1,
                            onChange: function onChange() {
                                return _this2.toggleOption(option);
                            },
                            className: prefixCls + '-item'
                        },
                        option.label
                    );
                });
            }

            var classString = classNames(prefixCls, className);
            return React.createElement(
                'div',
                { className: classString },
                children
            );
        }
    }]);

    return CheckboxGroup;
}(Component);

CheckboxGroup.defaultProps = {
    options: [],
    prefixCls: 'fy-checkbox-group'
};
CheckboxGroup.propTypes = {
    defaultValue: PropTypes.arrayOf(CheckboxValueType),
    value: PropTypes.arrayOf(CheckboxValueType),
    onChange: PropTypes.func,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([CheckboxOptionType, PropTypes.string])),
    disabled: PropTypes.bool,
    children: PropTypes.node
};
CheckboxGroup.childContextTypes = {
    checkboxGroup: PropTypes.any
};
export default CheckboxGroup;