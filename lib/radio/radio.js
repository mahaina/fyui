var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';

var Radio = function (_Component) {
    _inherits(Radio, _Component);

    function Radio() {
        _classCallCheck(this, Radio);

        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    _createClass(Radio, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var props = this.props,
                context = this.context;

            var prefixCls = props.prefixCls,
                className = props.className,
                children = props.children,
                style = props.style,
                restProps = _objectWithoutProperties(props, ['prefixCls', 'className', 'children', 'style']);

            var radioGroup = context.radioGroup;

            var radioProps = Object.assign({}, restProps);
            if (radioGroup) {
                radioProps.name = radioGroup.name;
                radioProps.onChange = radioGroup.onChange;
                radioProps.checked = props.value === radioGroup.value;
                radioProps.disabled = props.disabled || radioGroup.disabled;
            }
            var wrapperClassString = classNames(className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrapper', true), _defineProperty(_classNames, prefixCls + '-wrapper-checked', radioProps.checked), _defineProperty(_classNames, prefixCls + '-wrapper-disabled', radioProps.disabled), _classNames));

            return React.createElement(
                'label',
                {
                    className: wrapperClassString,
                    style: style,
                    onMouseEnter: props.onMouseEnter,
                    onMouseLeave: props.onMouseLeave
                },
                React.createElement(RcCheckbox, Object.assign({}, radioProps, {
                    prefixCls: prefixCls
                })),
                children !== undefined ? React.createElement(
                    'span',
                    null,
                    children
                ) : null
            );
        }
    }]);

    return Radio;
}(Component);

Radio.defaultProps = {
    prefixCls: 'fy-radio',
    type: 'radio'
};
Radio.propTypes = {
    type: PropTypes.string,
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
    children: PropTypes.node
};
Radio.contextTypes = {
    radioGroup: PropTypes.any
};
export default Radio;