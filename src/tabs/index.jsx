import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import RcTabs, {TabPane} from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import warning from 'warning';
import Icon from '../icon';
import isFlexSupported from '../_util/isFlexSupported';

export default class Tabs extends Component {
    static TabPane = TabPane;

    static propTypes = {
        activeKey: PropTypes.string,
        defaultActiveKey: PropTypes.string,
        hideAdd: PropTypes.bool,
        onChange: PropTypes.func,
        onTabClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        onNextClick: PropTypes.func,
        tabBarExtraContent: PropTypes.node,
        tabBarStyle: PropTypes.object,
        type: PropTypes.oneOf(['line', 'card', 'editable-card']),
        tabPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        onEdit: PropTypes.func,
        size: PropTypes.oneOf(['default', 'small']),
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        animated: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                inkBar: PropTypes.bool,
                tabPane: PropTypes.bool
            })
        ]),
        children: PropTypes.node
    };

    static defaultProps = {
        prefixCls: 'fy-tabs',
        hideAdd: false
    };

    componentDidMount() {
        const NO_FLEX = ' no-flex';
        const tabNode = findDOMNode(this);
        if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
            tabNode.className += NO_FLEX;
        }
    }

    createNewTab = targetKey => {
        const onEdit = this.props.onEdit;
        if (onEdit) {
            onEdit(targetKey, 'add');
        }
    }

    removeTab = (targetKey, e) => {
        e.stopPropagation();
        if (!targetKey) {
            return;
        }

        const onEdit = this.props.onEdit;
        if (onEdit) {
            onEdit(targetKey, 'remove');
        }
    }

    handleChange = activeKey => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(activeKey);
        }
    }

    render() {
        const {
            prefixCls,
            className = '',
            size,
            type = 'line',
            tabPosition,
            children,
            tabBarStyle,
            hideAdd,
            onTabClick,
            onPrevClick,
            onNextClick,
            animated = true
        } = this.props;
        let {tabBarExtraContent} = this.props;

        const animatedInfo = typeof animated === 'object'
            ? {inkBarAnimated: animated.inkBar, tabPaneAnimated: animated.tabPane}
            : {inkBarAnimated: animated, tabPaneAnimated: animated};

        const {inkBarAnimated} = animatedInfo;
        let {tabPaneAnimated} = animatedInfo;

        // card tabs should not have animation
        if (type !== 'line') {
            tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
        }

        warning(
            !(type.indexOf('card') >= 0 && size === 'small'),
            'Tabs[type=card|editable-card] doesn\'t have small size, it\'s by designed.'
        );
        const cls = classNames(className, {
            [`${prefixCls}-mini`]: size === 'small' || size === 'mini',
            [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
            [`${prefixCls}-card`]: type.indexOf('card') >= 0,
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-no-animation`]: !tabPaneAnimated
        });
        // only card type tabs can be added and closed
        let childrenWithClose;
        if (type === 'editable-card') {
            childrenWithClose = [];
            React.Children.forEach(children, (child, index) => {
                let closable = child.props.closable;
                closable = typeof closable === 'undefined' ? true : closable;
                const closeIcon = closable
                    ? (
                        <Icon
                            type="close"
                            onClick={e => this.removeTab(child.key, e)}
                        />
                    )
                    : null;
                childrenWithClose.push(cloneElement(child, {
                    tab: (
                        <div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
                            {child.props.tab}
                            {closeIcon}
                        </div>
                    ),
                    key: child.key || index
                }));
            });
            // Add new tab handler
            if (!hideAdd) {
                tabBarExtraContent = (
                    <span>
                        <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab} />
                        {tabBarExtraContent}
                    </span>
                );
            }
        }

        tabBarExtraContent = tabBarExtraContent
            ? (
                <div className={`${prefixCls}-extra-content`}>
                    {tabBarExtraContent}
                </div>
            )
            : null;

        const renderTabBar = () => (
            <ScrollableInkTabBar
                inkBarAnimated={inkBarAnimated}
                extraContent={tabBarExtraContent}
                onTabClick={onTabClick}
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                style={tabBarStyle}
            />
        );

        return (
            <RcTabs
                {...this.props}
                className={cls}
                tabBarPosition={tabPosition}
                renderTabBar={renderTabBar}
                renderTabContent={() => <TabContent animated={tabPaneAnimated} animatedWithMargin />}
                onChange={this.handleChange}
            >
                {childrenWithClose || children}
            </RcTabs>
        );
    }
}
