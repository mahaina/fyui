import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcTree, {TreeNode} from 'rc-tree';
import animation from '../_util/openAnimation';

/* eslint-disable react/default-props-match-prop-types */
export default class Tree extends Component {
    static TreeNode = TreeNode;

    static defaultProps = {
        prefixCls: 'fy-tree',
        checkable: false,
        showIcon: false,
        openAnimation: animation
    };

    static propTypes = {
        showLine: PropTypes.bool,
        className: PropTypes.string,
        multiple: PropTypes.bool,
        autoExpandParent: PropTypes.bool,
        checkStrictly: PropTypes.bool,
        checkable: PropTypes.bool,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
        expandedKeys: PropTypes.arrayOf(PropTypes.string),
        checkedKeys: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.shape({
                checked: PropTypes.arrayOf(PropTypes.string),
                halfChecked: PropTypes.arrayOf(PropTypes.string)
            })
        ]),
        defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
        onExpand: PropTypes.func,
        onCheck: PropTypes.func,
        onSelect: PropTypes.func,
        filterAntTreeNode: PropTypes.func,
        loadData: PropTypes.func,
        onRightClick: PropTypes.func,
        draggable: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        style: PropTypes.object,
        prefix: PropTypes.string,
        filterTreeNode: PropTypes.func,
        children: PropTypes.node
    };

    render() {
        const props = this.props;
        const {prefixCls, className, checkable} = props;
        return (
            <RcTree
                {...props}
                className={className}
                checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
            >
                {this.props.children}
            </RcTree>
        );
    }
}
