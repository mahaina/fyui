import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';


export default class Radio extends Component {
    static Group: typeof RadioGroup;
    static Button: typeof RadioButton;

    static defaultProps = {
        prefixCls: 'fy-radio',
        type: 'radio'
    };

    static propTypes = {
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

    static contextTypes = {
        radioGroup: PropTypes.any
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
    }

    render() {
        const {props, context} = this;
        const {
            prefixCls,
            className,
            children,
            style,
            ...restProps
        } = props;
        const {radioGroup} = context;
        const radioProps = {...restProps};
        if (radioGroup) {
            radioProps.name = radioGroup.name;
            radioProps.onChange = radioGroup.onChange;
            radioProps.checked = props.value === radioGroup.value;
            radioProps.disabled = props.disabled || radioGroup.disabled;
        }
        const wrapperClassString = classNames(className, {
            [`${prefixCls}-wrapper`]: true,
            [`${prefixCls}-wrapper-checked`]: radioProps.checked,
            [`${prefixCls}-wrapper-disabled`]: radioProps.disabled
        });

        return (
            <label
                className={wrapperClassString}
                style={style}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                <RcCheckbox
                    {...radioProps}
                    prefixCls={prefixCls}
                />
                {children !== undefined ? <span>{children}</span> : null}
            </label>
        );
    }
}
