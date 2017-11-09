import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Checkbox from './Checkbox';

const CheckboxValueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const CheckboxOptionType = PropTypes.shape({
    label: PropTypes.string,
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

export default class CheckboxGroup extends Component {
    static defaultProps = {
        options: [],
        prefixCls: 'fy-checkbox-group'
    };

    static propTypes = {
        defaultValue: PropTypes.arrayOf(CheckboxValueType),
        value: PropTypes.arrayOf(CheckboxValueType),
        onChange: PropTypes.func,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            CheckboxOptionType,
            PropTypes.string
        ])),
        disabled: PropTypes.bool,
        children: PropTypes.node
    };

    static childContextTypes = {
        checkboxGroup: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || []
        };
    }

    getChildContext() {
        return {
            checkboxGroup: {
                toggleOption: this.toggleOption,
                value: this.state.value,
                disabled: this.props.disabled
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({value: nextProps.value || []});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }

    getOptions() {
        const {options} = this.props;
        // https://github.com/Microsoft/TypeScript/issues/7960
        return options.map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option
                };
            }
            return option;
        });
    }

    toggleOption = option => {
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === -1) {
            value.push(option.value);
        } else {
            value.splice(optionIndex, 1);
        }
        if (!('value' in this.props)) {
            this.setState({value});
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(value);
        }
    };

    render() {
        const state = this.state;
        const {prefixCls, className, options, disabled} = this.props;
        let children = this.props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => (
                <Checkbox
                    key={option.value}
                    disabled={'disabled' in option ? option.disabled : disabled}
                    value={option.value}
                    checked={state.value.indexOf(option.value) !== -1}
                    onChange={() => this.toggleOption(option)}
                    className={`${prefixCls}-item`}
                >
                    {option.label}
                </Checkbox>
            ));
        }

        const classString = classNames(prefixCls, className);
        return (
            <div className={classString}>
                {children}
            </div>
        );
    }
}
