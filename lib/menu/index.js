var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import RcMenu, { Divider, SubMenu, ItemGroup } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import animation from '../_util/openAnimation';
import Item from './MenuItem';

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _initialiseProps.call(_this);

        warning(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');
        var openKeys = void 0;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        } else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }

        _this.state = {
            openKeys: openKeys || []
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                inlineCollapsed: this.getInlineCollapsed()
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
                this.switchModeFromInline = true;
            }
            if ('openKeys' in nextProps) {
                this.setState({ openKeys: nextProps.openKeys });
                return;
            }
            if (nextProps.inlineCollapsed && !this.props.inlineCollapsed || nextContext.siderCollapsed && !this.context.siderCollapsed) {
                this.switchModeFromInline = !!this.state.openKeys.length;
                this.inlineOpenKeys = this.state.openKeys;
                this.setState({ openKeys: [] });
            }
            if (!nextProps.inlineCollapsed && this.props.inlineCollapsed || !nextContext.siderCollapsed && this.context.siderCollapsed) {
                this.setState({ openKeys: this.inlineOpenKeys });
                this.inlineOpenKeys = [];
            }
        }
    }, {
        key: 'setOpenKeys',
        value: function setOpenKeys(openKeys) {
            if (!('openKeys' in this.props)) {
                this.setState({ openKeys: openKeys });
            }
        }
    }, {
        key: 'getRealMenuMode',
        value: function getRealMenuMode() {
            var inlineCollapsed = this.getInlineCollapsed();
            if (this.switchModeFromInline && inlineCollapsed) {
                return 'inline';
            }
            var mode = this.props.mode;

            return inlineCollapsed ? 'vertical' : mode;
        }
    }, {
        key: 'getInlineCollapsed',
        value: function getInlineCollapsed() {
            var inlineCollapsed = this.props.inlineCollapsed;

            if (this.context.siderCollapsed !== undefined) {
                return this.context.siderCollapsed;
            }
            return inlineCollapsed;
        }
    }, {
        key: 'getMenuOpenAnimation',
        value: function getMenuOpenAnimation(menuMode) {
            var _this2 = this;

            var _props = this.props,
                openAnimation = _props.openAnimation,
                openTransitionName = _props.openTransitionName;

            var menuOpenAnimation = openAnimation || openTransitionName;
            if (openAnimation === undefined && openTransitionName === undefined) {
                switch (menuMode) {
                    case 'horizontal':
                        menuOpenAnimation = 'slide-up';
                        break;
                    case 'vertical':
                        // When mode switch from inline
                        // submenu should hide without animation
                        if (this.switchModeFromInline) {
                            menuOpenAnimation = '';
                            this.switchModeFromInline = false;
                        } else {
                            menuOpenAnimation = 'zoom-big';
                        }
                        break;
                    case 'inline':
                        menuOpenAnimation = Object.assign({}, animation, {
                            leave: function leave(node, done) {
                                return animation.leave(node, function () {
                                    // Make sure inline menu leave animation finished before mode is switched
                                    _this2.switchModeFromInline = false;
                                    _this2.setState({});
                                    done();
                                });
                            }
                        });
                        break;
                    default:
                }
            }
            return menuOpenAnimation;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                className = _props2.className,
                theme = _props2.theme;

            var menuMode = this.getRealMenuMode();
            var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);

            var menuClassName = classNames(className, prefixCls + '-' + theme, _defineProperty({}, prefixCls + '-inline-collapsed', this.getInlineCollapsed()));

            var menuProps = {
                openKeys: this.state.openKeys,
                onOpenChange: this.handleOpenChange,
                className: menuClassName,
                mode: menuMode
            };

            if (menuMode !== 'inline') {
                // closing vertical popup submenu after click it
                menuProps.onClick = this.handleClick;
                menuProps.openTransitionName = menuOpenAnimation;
            } else {
                menuProps.openAnimation = menuOpenAnimation;
            }

            return React.createElement(RcMenu, Object.assign({}, this.props, menuProps));
        }
    }]);

    return Menu;
}(Component);

Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
    prefixCls: 'fy-menu',
    className: '',
    theme: 'light'
};
Menu.propTypes = {
    id: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark']),
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
    selectable: PropTypes.bool,
    selectedKeys: PropTypes.array,
    defaultSelectedKeys: PropTypes.array,
    openKeys: PropTypes.array,
    defaultOpenKeys: PropTypes.array,
    onOpenChange: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    openAnimation: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    openTransitionName: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    multiple: PropTypes.bool,
    inlineIndent: PropTypes.number,
    inlineCollapsed: PropTypes.bool
};
Menu.childContextTypes = {
    inlineCollapsed: PropTypes.bool
};
Menu.contextTypes = {
    siderCollapsed: PropTypes.bool
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.handleOpenChange = function (openKeys) {
        _this3.setOpenKeys(openKeys);
        var onOpenChange = _this3.props.onOpenChange;

        if (onOpenChange) {
            onOpenChange(openKeys);
        }
    };

    this.handleClick = function (e) {
        _this3.handleOpenChange([]);

        var onClick = _this3.props.onClick;

        if (onClick) {
            onClick(e);
        }
    };

    this.inlineOpenKeys = [];
};

export default Menu;