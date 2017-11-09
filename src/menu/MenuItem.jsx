import React, {Component} from 'react';
import {Item} from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

export default class MenuItem extends Component {
    static contextTypes = {
        inlineCollapsed: PropTypes.bool
    };
    static isMenuItem = 1;
    render() {
        const {inlineCollapsed} = this.context;
        const props = this.props;
        return (
            <Tooltip
                title={inlineCollapsed && props.level === 1 ? props.children : ''}
                placement="right"
                overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
            >
                <Item {...props} />
            </Tooltip>
        );
    }
}
