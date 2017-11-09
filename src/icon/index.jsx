import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';

export default function Icon(props) {
    const {type, className = '', spin} = props;
    const classString = classNames({
        fyicon: true,
        'fyicon-spin': !!spin || type === 'loading',
        [`fyicon-${type}`]: true
    }, className);
    return <i {...omit(props, ['type', 'spin'])} className={classString} />;
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    spin: PropTypes.bool,
    style: PropTypes.object
};
