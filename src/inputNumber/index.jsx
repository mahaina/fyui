import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';

export default class InputNumber extends React.PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        defaultValue: PropTypes.number,
        onKeyDown: PropTypes.func,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'small', 'default']),
        formatter: PropTypes.func,
        parser: PropTypes.func,
        placeholder: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
        precision: PropTypes.number
    };
    static defaultProps = {
        prefixCls: 'fy-input-number',
        step: 1
    };

    render() {
        const {className, size, ...others} = this.props;
        const inputNumberClass = classNames({
            [`${this.props.prefixCls}-lg`]: size === 'large',
            [`${this.props.prefixCls}-sm`]: size === 'small'
        }, className);
        return <RcInputNumber className={inputNumberClass} {...others} />;
    }
}
