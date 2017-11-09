import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Group(props) {
    const {prefixCls = 'fy-input-group', className = ''} = props;
    const cls = classNames(prefixCls, {
        [`${prefixCls}-lg`]: props.size === 'large',
        [`${prefixCls}-sm`]: props.size === 'small',
        [`${prefixCls}-compact`]: props.compact
    }, className);
    return (
        <span className={cls} style={props.style}>
            {props.children}
        </span>
    );
}

Group.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['large', 'small', 'default']),
    children: PropTypes.node,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    compact: PropTypes.bool
};
