var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import RcTabs, { TabPane } from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import warning from 'warning';
import Icon from '../icon';
import isFlexSupported from '../_util/isFlexSupported';

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tabs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.createNewTab = function (targetKey) {
            var onEdit = _this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'add');
            }
        }, _this.removeTab = function (targetKey, e) {
            e.stopPropagation();
            if (!targetKey) {
                return;
            }

            var onEdit = _this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'remove');
            }
        }, _this.handleChange = function (activeKey) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(activeKey);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var NO_FLEX = ' no-flex';
            var tabNode = findDOMNode(this);
            if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
                tabNode.className += NO_FLEX;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                size = _props.size,
                _props$type = _props.type,
                type = _props$type === undefined ? 'line' : _props$type,
                tabPosition = _props.tabPosition,
                children = _props.children,
                tabBarStyle = _props.tabBarStyle,
                hideAdd = _props.hideAdd,
                onTabClick = _props.onTabClick,
                onPrevClick = _props.onPrevClick,
                onNextClick = _props.onNextClick,
                _props$animated = _props.animated,
                animated = _props$animated === undefined ? true : _props$animated;
            var tabBarExtraContent = this.props.tabBarExtraContent;


            var animatedInfo = (typeof animated === 'undefined' ? 'undefined' : _typeof(animated)) === 'object' ? { inkBarAnimated: animated.inkBar, tabPaneAnimated: animated.tabPane } : { inkBarAnimated: animated, tabPaneAnimated: animated };

            var inkBarAnimated = animatedInfo.inkBarAnimated;
            var tabPaneAnimated = animatedInfo.tabPaneAnimated;

            // card tabs should not have animation

            if (type !== 'line') {
                tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
            }

            warning(!(type.indexOf('card') >= 0 && size === 'small'), 'Tabs[type=card|editable-card] doesn\'t have small size, it\'s by designed.');
            var cls = classNames(className, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-mini', size === 'small' || size === 'mini'), _defineProperty(_classNames, prefixCls + '-vertical', tabPosition === 'left' || tabPosition === 'right'), _defineProperty(_classNames, prefixCls + '-card', type.indexOf('card') >= 0), _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-no-animation', !tabPaneAnimated), _classNames));
            // only card type tabs can be added and closed
            var childrenWithClose = void 0;
            if (type === 'editable-card') {
                childrenWithClose = [];
                React.Children.forEach(children, function (child, index) {
                    var closable = child.props.closable;
                    closable = typeof closable === 'undefined' ? true : closable;
                    var closeIcon = closable ? React.createElement(Icon, {
                        type: 'close',
                        onClick: function onClick(e) {
                            return _this2.removeTab(child.key, e);
                        }
                    }) : null;
                    childrenWithClose.push(cloneElement(child, {
                        tab: React.createElement(
                            'div',
                            { className: closable ? undefined : prefixCls + '-tab-unclosable' },
                            child.props.tab,
                            closeIcon
                        ),
                        key: child.key || index
                    }));
                });
                // Add new tab handler
                if (!hideAdd) {
                    tabBarExtraContent = React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
                        tabBarExtraContent
                    );
                }
            }

            tabBarExtraContent = tabBarExtraContent ? React.createElement(
                'div',
                { className: prefixCls + '-extra-content' },
                tabBarExtraContent
            ) : null;

            var renderTabBar = function renderTabBar() {
                return React.createElement(ScrollableInkTabBar, {
                    inkBarAnimated: inkBarAnimated,
                    extraContent: tabBarExtraContent,
                    onTabClick: onTabClick,
                    onPrevClick: onPrevClick,
                    onNextClick: onNextClick,
                    style: tabBarStyle
                });
            };

            return React.createElement(
                RcTabs,
                Object.assign({}, this.props, {
                    className: cls,
                    tabBarPosition: tabPosition,
                    renderTabBar: renderTabBar,
                    renderTabContent: function renderTabContent() {
                        return React.createElement(TabContent, { animated: tabPaneAnimated, animatedWithMargin: true });
                    },
                    onChange: this.handleChange
                }),
                childrenWithClose || children
            );
        }
    }]);

    return Tabs;
}(Component);

Tabs.TabPane = TabPane;
Tabs.propTypes = {
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
    animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        inkBar: PropTypes.bool,
        tabPane: PropTypes.bool
    })]),
    children: PropTypes.node
};
Tabs.defaultProps = {
    prefixCls: 'fy-tabs',
    hideAdd: false
};
export default Tabs;