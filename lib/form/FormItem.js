var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import warning from 'warning';
import Row from '../grid/row';
import Col from '../grid/col';
import { FIELD_META_PROP } from './constants';

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FormItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(_ref, [this].concat(args))), _this), _this.onLabelClick = function (e) {
            var id = _this.props.id || _this.getId();
            if (!id) {
                return;
            }
            var controls = document.querySelectorAll('[id="' + id + '"]');
            if (controls.length !== 1) {
                e.preventDefault();
                var control = findDOMNode(_this).querySelector('[id="' + id + '"]');
                if (control && control.focus) {
                    control.focus();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            warning(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' + 'while there are more than one `getFieldDecorator` in it.');
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return PureRenderMixin.shouldComponentUpdate.apply(this, args);
        }

        // Resolve duplicated ids bug between different forms
        // https://github.com/ant-design/ant-design/issues/7351

    }, {
        key: 'getControls',
        value: function getControls(children, recursively) {
            var controls = [];
            var childrenArray = React.Children.toArray(children);
            for (var i = 0; i < childrenArray.length; i++) {
                if (!recursively && controls.length > 0) {
                    break;
                }

                var child = childrenArray[i];
                if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
                    continue;
                }
                if (!child.props) {
                    continue;
                }
                if (FIELD_META_PROP in child.props) {
                    controls.push(child);
                } else if (child.props.children) {
                    controls = controls.concat(this.getControls(child.props.children, recursively));
                }
            }
            return controls;
        }
    }, {
        key: 'getOnlyControl',
        value: function getOnlyControl() {
            var child = this.getControls(this.props.children, false)[0];
            return child !== undefined ? child : null;
        }
    }, {
        key: 'getChildProp',
        value: function getChildProp(prop) {
            var child = this.getOnlyControl();
            return child && child.props && child.props[prop];
        }
    }, {
        key: 'getId',
        value: function getId() {
            return this.getChildProp('id');
        }
    }, {
        key: 'getMeta',
        value: function getMeta() {
            return this.getChildProp(FIELD_META_PROP);
        }
    }, {
        key: 'getHelpMsg',
        value: function getHelpMsg() {
            var context = this.context;
            var props = this.props;
            if (props.help === undefined && context.form) {
                return this.getId() ? (context.form.getFieldError(this.getId()) || []).join(', ') : '';
            }

            return props.help;
        }
    }, {
        key: 'getValidateStatus',
        value: function getValidateStatus() {
            var _context$form = this.context.form,
                isFieldValidating = _context$form.isFieldValidating,
                getFieldError = _context$form.getFieldError,
                getFieldValue = _context$form.getFieldValue;

            var fieldId = this.getId();
            if (!fieldId) {
                return '';
            }
            if (isFieldValidating(fieldId)) {
                return 'validating';
            }
            if (getFieldError(fieldId)) {
                return 'error';
            }
            var fieldValue = getFieldValue(fieldId);
            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                return 'success';
            }
            return '';
        }
    }, {
        key: 'isRequired',
        value: function isRequired() {
            var required = this.props.required;

            if (required !== undefined) {
                return required;
            }
            if (this.context.form) {
                var meta = this.getMeta() || {};
                var validate = meta.validate || [];

                return validate.filter(function (item) {
                    return !!item.rules;
                }).some(function (item) {
                    return item.rules.some(function (rule) {
                        return rule.required;
                    });
                });
            }
            return false;
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper(children) {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                wrapperCol = _props.wrapperCol;

            var className = classNames(prefixCls + '-item-control-wrapper', wrapperCol && wrapperCol.className);
            return React.createElement(
                Col,
                Object.assign({}, wrapperCol, { className: className, key: 'wrapper' }),
                children
            );
        }
    }, {
        key: 'renderValidateWrapper',
        value: function renderValidateWrapper(c1, c2, c3) {
            var classes = '';
            var form = this.context.form;
            var props = this.props;
            var validateStatus = props.validateStatus === undefined && form ? this.getValidateStatus() : props.validateStatus;

            if (validateStatus) {
                classes = classNames({
                    'has-feedback': props.hasFeedback || validateStatus === 'validating',
                    'has-success': validateStatus === 'success',
                    'has-warning': validateStatus === 'warning',
                    'has-error': validateStatus === 'error',
                    'is-validating': validateStatus === 'validating'
                });
            }
            return React.createElement(
                'div',
                { className: this.props.prefixCls + '-item-control ' + classes },
                c1,
                c2,
                c3
            );
        }
    }, {
        key: 'renderExtra',
        value: function renderExtra() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                extra = _props2.extra;

            return extra ? React.createElement(
                'div',
                { className: prefixCls + '-extra' },
                extra
            ) : null;
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp() {
            var prefixCls = this.props.prefixCls;
            var help = this.getHelpMsg();
            return help ? React.createElement(
                'div',
                { className: prefixCls + '-explain', key: 'help' },
                help
            ) : null;
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                label = _props3.label,
                labelCol = _props3.labelCol,
                colon = _props3.colon,
                id = _props3.id;

            var context = this.context;
            var required = this.isRequired();

            var labelColClassName = classNames(prefixCls + '-item-label', labelCol && labelCol.className);
            var labelClassName = classNames(_defineProperty({}, prefixCls + '-item-required', required));

            var labelChildren = label;
            // Keep label is original where there should have no colon
            var haveColon = colon && !context.vertical;
            // Remove duplicated user input colon
            if (haveColon && typeof label === 'string' && label.trim() !== '') {
                labelChildren = label.replace(/[：|:]\s*$/, '');
            }

            return label ? React.createElement(
                Col,
                Object.assign({}, labelCol, { className: labelColClassName, key: 'label' }),
                React.createElement(
                    'label',
                    {
                        htmlFor: id || this.getId(),
                        className: labelClassName,
                        title: typeof label === 'string' ? label : '',
                        onClick: this.onLabelClick
                    },
                    labelChildren
                )
            ) : null;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var props = this.props;
            var children = React.Children.map(props.children, function (child) {
                if (child && typeof child.type === 'function' && !child.props.size) {
                    return React.cloneElement(child, { size: 'large' });
                }
                return child;
            });
            return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra()))];
        }
    }, {
        key: 'renderFormItem',
        value: function renderFormItem(children) {
            var _itemClassName;

            var props = this.props;
            var prefixCls = props.prefixCls;
            var style = props.style;
            var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, prefixCls + '-item', true), _defineProperty(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg()), _defineProperty(_itemClassName, prefixCls + '-item-no-colon', !props.colon), _defineProperty(_itemClassName, '' + props.className, !!props.className), _itemClassName);

            return React.createElement(
                Row,
                { className: classNames(itemClassName), style: style },
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.renderChildren();
            return this.renderFormItem(children);
        }
    }]);

    return FormItem;
}(Component);

FormItem.defaultProps = {
    hasFeedback: false,
    prefixCls: 'fy-form',
    colon: true
};
FormItem.propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool,
    required: PropTypes.bool,
    style: PropTypes.object,
    extra: PropTypes.any
};
FormItem.contextTypes = {
    form: PropTypes.object,
    vertical: PropTypes.bool
};
export default FormItem;