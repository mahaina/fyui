import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Radio from './radio';

function getCheckedValue(children) {
    let value = null;
    let matched = false;
    React.Children.forEach(children, radio => {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? {value} : undefined;
}

const CheckboxValueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const CheckboxOptionType = PropTypes.shape({
    label: PropTypes.string,
    value: CheckboxValueType,
    disabled: PropTypes.bool
});

export default class RadioGroup extends Component {
    static defaultProps = {
        disabled: false
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.oneOfType([
            CheckboxOptionType,
            PropTypes.string
        ])),
        disabled: PropTypes.bool,
        style: PropTypes.object,
        defaultValue: PropTypes.any,
        value: PropTypes.any,
        onChange: PropTypes.func,
        size: PropTypes.oneOf(['large', 'default', 'small']),
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        name: PropTypes.string,
        children: PropTypes.node
    };

    static childContextTypes = {
        radioGroup: PropTypes.any
    };

    constructor(props) {
        super(props);
        let value;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            const checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
        this.state = {
            value
        };
    }

    getChildContext() {
        return {
            radioGroup: {
                onChange: this.onRadioChange,
                value: this.state.value,
                disabled: this.props.disabled,
                name: this.props.name
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        } else {
            const checkedValue = getCheckedValue(nextProps.children);
            if (checkedValue) {
                this.setState({
                    value: checkedValue.value
                });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }

    onRadioChange = ev => {
        const lastValue = this.state.value;
        const {value} = ev.target;
        if (!('value' in this.props)) {
            this.setState({
                value
            });
        }

        const onChange = this.props.onChange;
        if (onChange && value !== lastValue) {
            onChange(ev);
        }
    }
    render() {
        const {
            prefixCls = 'ant-radio-group',
            className = '',
            options,
            disabled,
            style,
            onMouseEnter,
            onMouseLeave,
            size
        } = this.props;
        let children = this.props.children;
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${size}`]: size
        }, className);

        // 如果存在 options, 优先使用
        if (options && options.length > 0) {
            children = options.map((option, index) => {
                if (typeof option === 'string') { // 此处类型自动推导为 string
                    return (
                        <Radio
                            key={index}
                            disabled={disabled}
                            value={option}
                            onChange={this.onRadioChange}
                            checked={this.state.value === option}
                        >
                            {option}
                        </Radio>
                    );
                }
                // 此处类型自动推导为 { label: string value: string }
                return (
                    <Radio
                        key={index}
                        disabled={option.disabled || disabled}
                        value={option.value}
                        onChange={this.onRadioChange}
                        checked={this.state.value === option.value}
                    >
                        {option.label}
                    </Radio>
                );
            });
        }

        return (
            <div
                className={classString}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        );
    }
}
