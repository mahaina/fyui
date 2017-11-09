import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from 'rc-form/lib/createDOMForm';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import omit from 'omit.js';
import createReactClass from 'create-react-class';
import warning from 'warning';
import FormItem from './FormItem';
import {FIELD_META_PROP} from './constants';

export default class Form extends Component {
    static defaultProps = {
        prefixCls: 'fy-form',
        layout: 'horizontal',
        hideRequiredMark: false,
        onSubmit(e) {
            e.preventDefault();
        }
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
        children: PropTypes.any,
        onSubmit: PropTypes.func,
        hideRequiredMark: PropTypes.bool,
        wrappedComponentRef: PropTypes.any,
        className: PropTypes.string
    };

    static childContextTypes = {
        vertical: PropTypes.bool
    };

    static Item = FormItem;

    static create = function (options = {}) {
        const formWrapper = createDOMForm({
            fieldNameProp: 'id',
            ...options,
            fieldMetaProp: FIELD_META_PROP
        });

        /* eslint-disable react/prefer-es6-class,react/no-multi-comp, react/no-unused-prop-types */
        return Component => formWrapper(createReactClass({
            propTypes: {
                form: PropTypes.object.isRequired
            },
            childContextTypes: {
                form: PropTypes.object.isRequired
            },
            getChildContext() {
                return {
                    form: this.props.form
                };
            },
            componentWillMount() {
                this.__getFieldProps = this.props.form.getFieldProps;
            },
            deprecatedGetFieldProps(name, option) {
                warning(
                    false,
                    '`getFieldProps` is not recommended, please use `getFieldDecorator` instead, ' +
                    'see: https://u.ant.design/get-field-decorator',
                );
                return this.__getFieldProps(name, option);
            },
            render() {
                this.props.form.getFieldProps = this.deprecatedGetFieldProps;

                const withRef = {};
                if (options.withRef) {
                    withRef.ref = 'formWrappedComponent';
                } else if (this.props.wrappedComponentRef) {
                    withRef.ref = this.props.wrappedComponentRef;
                }
                return <Component {...this.props} {...withRef} />;
            }
        }));
    };
    /* eslint-enable react/prefer-es6-class,react/no-multi-comp, react/no-unused-prop-types */

    getChildContext() {
        const {layout} = this.props;
        return {
            vertical: layout === 'vertical'
        };
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    render() {
        const {
            prefixCls, hideRequiredMark, className = '', layout
        } = this.props;
        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: layout === 'horizontal',
            [`${prefixCls}-vertical`]: layout === 'vertical',
            [`${prefixCls}-inline`]: layout === 'inline',
            [`${prefixCls}-hide-required-mark`]: hideRequiredMark
        }, className);

        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'layout',
            'form',
            'hideRequiredMark'
        ]);

        return <form {...formProps} className={formClassName} />;
    }
}
