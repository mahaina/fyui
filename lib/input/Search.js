var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from './Input';
import Icon from '../icon';

var Search = function (_Component) {
    _inherits(Search, _Component);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.refs.input.value);
            }
            _this.input.focus();
        }, _this.onSearch = function () {
            var onSearch = _this.props.onSearch;

            if (onSearch) {
                onSearch(_this.input.refs.input.value);
            }
            _this.input.focus();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                inputPrefixCls = _props.inputPrefixCls,
                prefixCls = _props.prefixCls,
                suffix = _props.suffix,
                others = _objectWithoutProperties(_props, ['className', 'inputPrefixCls', 'prefixCls', 'suffix']);

            delete others.onSearch;
            var searchIcon = React.createElement(Icon, {
                className: prefixCls + '-icon',
                onClick: this.onSearch,
                type: 'search',
                key: 'searchIcon'
            });
            var searchSuffix = suffix ? [suffix, searchIcon] : searchIcon;
            return React.createElement(Input, Object.assign({
                onPressEnter: this.onSearch
            }, others, {
                className: classNames(prefixCls, className),
                prefixCls: inputPrefixCls,
                suffix: searchSuffix,
                ref: function ref(node) {
                    _this2.input = node;
                }
            }));
        }
    }]);

    return Search;
}(Component);

Search.defaultProps = {
    inputPrefixCls: 'fy-input',
    prefixCls: 'fy-input-search',
    className: PropTypes.string
};
Search.propTypes = {
    inputPrefixCls: PropTypes.string,
    className: PropTypes.string,
    onSearch: PropTypes.func,
    prefixCls: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    maxLength: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    autoComplete: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    spellCheck: PropTypes.bool,
    autoFocus: PropTypes.bool
};
export default Search;