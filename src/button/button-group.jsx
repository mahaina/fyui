import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ButtonGroup(props) {
    const {
        prefixCls = 'fy-btn-group',
        size,
        className,
        ...others
    } = props;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    }

    const classes = classNames(prefixCls, {
        [`${prefixCls}-${sizeCls}`]: sizeCls
    }, className);

    return <div {...others} className={classes} />;
}

ButtonGroup.propTypes = {
    size: PropTypes.oneOf(['large', 'small']),
    style: PropTypes.object,
    className: PropTypes.string,
    prefixCls: PropTypes.string
};

