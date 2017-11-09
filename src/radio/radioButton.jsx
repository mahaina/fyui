import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';

export default class RadioButton extends Component {
    static defaultProps = {
        prefixCls: 'ant-radio-button'
    };

    static propTypes = {
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

    render() {
        const radioProps = {...this.props};
        if (this.context.radioGroup) {
            radioProps.onChange = this.context.radioGroup.onChange;
            radioProps.checked = this.props.value === this.context.radioGroup.value;
            radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
        }

        return (
            <Radio {...radioProps} />
        );
    }
}
