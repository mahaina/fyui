var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';

var RadioButton = function (_Component) {
    _inherits(RadioButton, _Component);

    function RadioButton() {
        _classCallCheck(this, RadioButton);

        return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
    }

    _createClass(RadioButton, [{
        key: 'render',
        value: function render() {
            var radioProps = Object.assign({}, this.props);
            if (this.context.radioGroup) {
                radioProps.onChange = this.context.radioGroup.onChange;
                radioProps.checked = this.props.value === this.context.radioGroup.value;
                radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
            }

            return React.createElement(Radio, radioProps);
        }
    }]);

    return RadioButton;
}(Component);

RadioButton.defaultProps = {
    prefixCls: 'ant-radio-button'
};
RadioButton.propTypes = {
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
RadioButton.contextTypes = {
    radioGroup: PropTypes.any
};
export default RadioButton;