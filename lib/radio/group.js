var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Radio from './radio';

function getCheckedValue(children) {
    var value = null;
    var matched = false;
    React.Children.forEach(children, function (radio) {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? { value: value } : undefined;
}

var CheckboxValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

var CheckboxOptionType = PropTypes.shape({
    label: PropTypes.string,
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _initialiseProps.call(_this);

        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            var checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                radioGroup: {
                    onChange: this.onRadioChange,
                    value: this.state.value,
                    disabled: this.props.disabled,
                    name: this.props.name
                }
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ('value' in nextProps) {
                this.setState({
                    value: nextProps.value
                });
            } else {
                var checkedValue = getCheckedValue(nextProps.children);
                if (checkedValue) {
                    this.setState({
                        value: checkedValue.value
                    });
                }
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$prefixCls = _props.prefixCls,
                prefixCls = _props$prefixCls === undefined ? 'ant-radio-group' : _props$prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                options = _props.options,
                disabled = _props.disabled,
                style = _props.style,
                onMouseEnter = _props.onMouseEnter,
                onMouseLeave = _props.onMouseLeave,
                size = _props.size;

            var children = this.props.children;
            var classString = classNames(prefixCls, _defineProperty({}, prefixCls + '-' + size, size), className);

            // 如果存在 options, 优先使用
            if (options && options.length > 0) {
                children = options.map(function (option, index) {
                    if (typeof option === 'string') {
                        // 此处类型自动推导为 string
                        return React.createElement(
                            Radio,
                            {
                                key: index,
                                disabled: disabled,
                                value: option,
                                onChange: _this2.onRadioChange,
                                checked: _this2.state.value === option
                            },
                            option
                        );
                    }
                    // 此处类型自动推导为 { label: string value: string }
                    return React.createElement(
                        Radio,
                        {
                            key: index,
                            disabled: option.disabled || disabled,
                            value: option.value,
                            onChange: _this2.onRadioChange,
                            checked: _this2.state.value === option.value
                        },
                        option.label
                    );
                });
            }

            return React.createElement(
                'div',
                {
                    className: classString,
                    style: style,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                },
                children
            );
        }
    }]);

    return RadioGroup;
}(Component);

RadioGroup.defaultProps = {
    disabled: false
};
RadioGroup.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.oneOfType([CheckboxOptionType, PropTypes.string])),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.node
};
RadioGroup.childContextTypes = {
    radioGroup: PropTypes.any
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onRadioChange = function (ev) {
        var lastValue = _this3.state.value;
        var value = ev.target.value;

        if (!('value' in _this3.props)) {
            _this3.setState({
                value: value
            });
        }

        var onChange = _this3.props.onChange;
        if (onChange && value !== lastValue) {
            onChange(ev);
        }
    };
};

export default RadioGroup;