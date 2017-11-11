var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

var TextArea = function (_Component) {
    _inherits(TextArea, _Component);

    function TextArea() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TextArea);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.resizeTextarea = function () {
            var autosize = _this.props.autosize;

            if (!autosize || !_this.textAreaRef) {
                return;
            }
            var minRows = autosize ? autosize.minRows : null;
            var maxRows = autosize ? autosize.maxRows : null;
            var textareaStyles = calculateNodeHeight(_this.textAreaRef, false, minRows, maxRows);
            _this.setState({ textareaStyles: textareaStyles });
        }, _this.handleTextareaChange = function (e) {
            if (!('value' in _this.props)) {
                _this.resizeTextarea();
            }
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(e);
            }
        }, _this.handleKeyDown = function (e) {
            var _this$props = _this.props,
                onPressEnter = _this$props.onPressEnter,
                onKeyDown = _this$props.onKeyDown;

            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        }, _this.saveTextAreaRef = function (textArea) {
            _this.textAreaRef = textArea;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TextArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeTextarea();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Re-render with the new content then recalculate the height as required.
            if (this.props.value !== nextProps.value) {
                if (this.nextFrameActionId) {
                    clearNextFrameAction(this.nextFrameActionId);
                }
                this.nextFrameActionId = onNextFrame(this.resizeTextarea);
            }
        }
    }, {
        key: 'getTextAreaClassName',
        value: function getTextAreaClassName() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                disabled = _props.disabled;

            return classNames(prefixCls, className, _defineProperty({}, prefixCls + '-disabled', disabled));
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.textAreaRef.blur();
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.textAreaRef.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autosize']);
            var style = Object.assign({}, props.style, this.state.textareaStyles);
            // Fix https://github.com/ant-design/ant-design/issues/6776
            // Make sure it could be reset when using form.getFieldDecorator
            if ('value' in otherProps) {
                otherProps.value = otherProps.value || '';
            }
            return React.createElement('textarea', Object.assign({}, otherProps, {
                className: this.getTextAreaClassName(),
                style: style,
                onKeyDown: this.handleKeyDown,
                onChange: this.handleTextareaChange,
                ref: this.saveTextAreaRef
            }));
        }
    }]);

    return TextArea;
}(Component);

TextArea.defaultProps = {
    prefixCls: 'fy-input'
};
TextArea.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    style: PropTypes.object,
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number
    })]),
    onPressEnter: PropTypes.func,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func
};
export default TextArea;