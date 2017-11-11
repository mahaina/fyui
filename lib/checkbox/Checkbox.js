var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import shallowEqual from 'shallowequal';
import CheckboxGroup from './Group';

var Checkbox = function (_Component) {
    _inherits(Checkbox, _Component);

    function Checkbox() {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    _createClass(Checkbox, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props,
                context = this.context;

            var prefixCls = props.prefixCls,
                className = props.className,
                children = props.children,
                indeterminate = props.indeterminate,
                style = props.style,
                onMouseEnter = props.onMouseEnter,
                onMouseLeave = props.onMouseLeave,
                restProps = _objectWithoutProperties(props, ['prefixCls', 'className', 'children', 'indeterminate', 'style', 'onMouseEnter', 'onMouseLeave']);

            var checkboxGroup = context.checkboxGroup;

            var checkboxProps = Object.assign({}, restProps);
            if (checkboxGroup) {
                checkboxProps.onChange = function () {
                    return checkboxGroup.toggleOption({ label: children, value: props.value });
                };
                checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
                checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
            }
            var classString = classNames(className, _defineProperty({}, prefixCls + '-wrapper', true));
            var checkboxClass = classNames(_defineProperty({}, prefixCls + '-indeterminate', indeterminate));
            return React.createElement(
                'label',
                {
                    className: classString,
                    style: style,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                },
                React.createElement(RcCheckbox, Object.assign({}, checkboxProps, {
                    prefixCls: prefixCls,
                    className: checkboxClass
                })),
                children !== undefined ? React.createElement(
                    'span',
                    null,
                    children
                ) : null
            );
        }
    }]);

    return Checkbox;
}(Component);

Checkbox.defaultProps = {
    prefixCls: 'fy-checkbox',
    indeterminate: false
};
Checkbox.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    children: PropTypes.node,
    indeterminate: PropTypes.bool
};
Checkbox.contextTypes = {
    checkboxGroup: PropTypes.any
};
export default Checkbox;