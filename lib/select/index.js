var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import warning from 'warning';

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        _classCallCheck(this, Select);

        return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    _createClass(Select, [{
        key: 'getLocale',
        value: function getLocale() {
            var antLocale = this.context.antLocale;

            if (antLocale && antLocale.Select) {
                return antLocale.Select;
            }
            return {
                notFoundContent: '无匹配结果'
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                size = _props.size,
                mode = _props.mode,
                multiple = _props.multiple,
                tags = _props.tags,
                combobox = _props.combobox,
                restProps = _objectWithoutProperties(_props, ['prefixCls', 'className', 'size', 'mode', 'multiple', 'tags', 'combobox']);

            warning(!multiple && !tags && !combobox, '`Select[multiple|tags|combobox]` is deprecated, please use `Select[mode]` instead.');

            var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _classNames), className);

            var locale = this.getLocale();
            var _props2 = this.props,
                _props2$notFoundConte = _props2.notFoundContent,
                notFoundContent = _props2$notFoundConte === undefined ? locale.notFoundContent : _props2$notFoundConte,
                optionLabelProp = _props2.optionLabelProp;

            var isCombobox = mode === 'combobox' || combobox;
            if (isCombobox) {
                notFoundContent = null;
                // children 带 dom 结构时，无法填入输入框
                optionLabelProp = optionLabelProp || 'value';
            }

            var modeConfig = {
                multiple: mode === 'multiple' || multiple,
                tags: mode === 'tags' || tags,
                combobox: isCombobox
            };

            return React.createElement(RcSelect, Object.assign({}, restProps, modeConfig, {
                prefixCls: prefixCls,
                className: cls,
                optionLabelProp: optionLabelProp || 'children',
                notFoundContent: notFoundContent
            }));
        }
    }]);

    return Select;
}(Component);

Select.Option = Option;
Select.OptGroup = OptGroup;
Select.defaultProps = {
    prefixCls: 'fy-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom'
};
Select.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    notFoundContent: PropTypes.node,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    showSearch: PropTypes.bool,
    allowClear: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    dropdownClassName: PropTypes.string,
    dropdownStyle: PropTypes.object,
    dropdownMenuStyle: PropTypes.object,
    onSearch: PropTypes.func,
    filterOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    mode: PropTypes.oneOf(['default', 'multiple', 'tags', 'combobox']),
    multiple: PropTypes.bool,
    tags: PropTypes.bool,
    combobox: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    dropdownMatchSelectWidth: PropTypes.bool,
    optionFilterProp: PropTypes.string,
    defaultActiveFirstOption: PropTypes.bool,
    labelInValue: PropTypes.bool,
    getPopupContainer: PropTypes.func,
    tokenSeparators: PropTypes.arrayOf(PropTypes.string),
    getInputElement: PropTypes.func
};
Select.contextTypes = {
    antLocale: PropTypes.object
};
export default Select;