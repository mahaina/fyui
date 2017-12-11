import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Menu, {SubMenu, Item as MenuItem} from 'rc-menu';
import closest from 'dom-closest';
import classNames from 'classnames';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Checkbox from '../checkbox';
import Radio from '../radio';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';

export default class FilterMenu extends Component {
    static defaultProps = {
        handleFilter() {},
        column: {}
    };
    static propTypes = {
        locale: PropTypes.any,
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        column: PropTypes.shape({
            filterMultiple: PropTypes.bool,
            filterDropdown: PropTypes.node,
            filters: PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string,
                children: PropTypes.any
            }),
            filterDropdownVisible: PropTypes.bool,
            onFilterDropdownVisibleChange: PropTypes.func,
            fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
            filterIcon: PropTypes.node
        }),
        /* eslint-disable react/no-unused-prop-types */
        handleFilter: PropTypes.func,
        confirmFilter: PropTypes.func,
        prefixCls: PropTypes.string,
        dropdownPrefixCls: PropTypes.string,
        getPopupContainer: PropTypes.func
    };

    constructor(props) {
        super(props);

        const visible = ('filterDropdownVisible' in props.column) ?
            props.column.filterDropdownVisible : false;

        this.state = {
            selectedKeys: props.selectedKeys,
            keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
            visible
        };
    }

    componentDidMount() {
        const {column} = this.props;
        this.setNeverShown(column);
    }

    componentWillReceiveProps(nextProps) {
        const {column} = nextProps;
        this.setNeverShown(column);
        const newState = {};
        if ('selectedKeys' in nextProps) {
            newState.selectedKeys = nextProps.selectedKeys;
        }
        if ('filterDropdownVisible' in column) {
            newState.visible = column.filterDropdownVisible;
        }
        if (Object.keys(newState).length > 0) {
            this.setState(newState);
        }
    }
    onVisibleChange = visible => {
        this.setVisible(visible);
        if (!visible) {
            this.confirmFilter();
        }
    }

    setNeverShown = column => {
        const rootNode = ReactDOM.findDOMNode(this);
        const filterBelongToScrollBody = !!closest(rootNode, '.fy-table-scroll');
        if (filterBelongToScrollBody) {
            this.neverShown = !!column.fixed;
        }
    }

    setSelectedKeys = ({selectedKeys}) => {
        this.setState({selectedKeys});
    }

    setVisible(visible) {
        const {column} = this.props;
        if (!('filterDropdownVisible' in column)) {
            this.setState({visible});
        }
        if (column.onFilterDropdownVisibleChange) {
            column.onFilterDropdownVisibleChange(visible);
        }
    }

    handleClearFilters = () => {
        this.setState({
            selectedKeys: []
        }, this.handleConfirm);
    }

    handleConfirm = () => {
        this.setVisible(false);
        this.confirmFilter();
    }

    confirmFilter() {
        if (this.state.selectedKeys !== this.props.selectedKeys) {
            this.props.confirmFilter(this.props.column, this.state.selectedKeys);
        }
    }

    hasSubMenu() {
        const {column: {filters = []}} = this.props;
        return filters.some(item => !!(item.children && item.children.length > 0));
    }

    handleMenuItemClick = info => {
        if (info.keyPath.length <= 1) {
            return;
        }
        const keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
        if (this.state.selectedKeys.indexOf(info.key) >= 0) {
            // deselect SubMenu child
            delete keyPathOfSelectedItem[info.key];
        } else {
            // select SubMenu child
            keyPathOfSelectedItem[info.key] = info.keyPath;
        }
        this.setState({keyPathOfSelectedItem});
    }

    renderMenus(items) {
        return items.map(item => {
            if (item.children && item.children.length > 0) {
                const {keyPathOfSelectedItem} = this.state;
                const containSelected = Object.keys(keyPathOfSelectedItem).some(
                    key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0,
                );
                const subMenuCls = containSelected ? `${this.props.dropdownPrefixCls}-submenu-contain-selected` : '';
                return (
                    <SubMenu title={item.text} className={subMenuCls} key={item.value.toString()}>
                        {this.renderMenus(item.children)}
                    </SubMenu>
                );
            }
            return this.renderMenuItem(item);
        });
    }

    renderFilterIcon = () => {
        const {column, locale, prefixCls} = this.props;
        const filterIcon = column.filterIcon;
        const dropdownSelectedClass = this.props.selectedKeys.length > 0 ? `${prefixCls}-selected` : '';

        return filterIcon ? React.cloneElement(filterIcon, {
            title: locale.filterTitle,
            className: classNames(filterIcon.className, {
                [`${prefixCls}-icon`]: true
            })
        }) : <Icon title={locale.filterTitle} type="filter" className={dropdownSelectedClass} />;
    }
    renderMenuItem(item) {
        const {column} = this.props;
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const input = multiple ? (
            <Checkbox checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
        ) : (
            <Radio checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
        );

        return (
            <MenuItem key={item.value}>
                {input}
                <span>{item.text}</span>
            </MenuItem>
        );
    }
    render() {
        const {column, locale, prefixCls, dropdownPrefixCls, getPopupContainer} = this.props;
        // default multiple selection in filter dropdown
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const dropdownMenuClass = classNames({
            [`${dropdownPrefixCls}-menu-without-submenu`]: !this.hasSubMenu()
        });
        const menus = column.filterDropdown ? (
            <FilterDropdownMenuWrapper>
                {column.filterDropdown}
            </FilterDropdownMenuWrapper>
        ) : (
            <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
                <Menu
                    multiple={multiple}
                    onClick={this.handleMenuItemClick}
                    prefixCls={`${dropdownPrefixCls}-menu`}
                    className={dropdownMenuClass}
                    onSelect={this.setSelectedKeys}
                    onDeselect={this.setSelectedKeys}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderMenus(column.filters)}
                </Menu>
                <div className={`${prefixCls}-dropdown-btns`}>
                    <a
                        className={`${prefixCls}-dropdown-link confirm`}
                        onClick={this.handleConfirm}
                    >
                        {locale.filterConfirm}
                    </a>
                    <a
                        className={`${prefixCls}-dropdown-link clear`}
                        onClick={this.handleClearFilters}
                    >
                        {locale.filterReset}
                    </a>
                </div>
            </FilterDropdownMenuWrapper>
        );

        return (
            <Dropdown
                trigger={['click']}
                overlay={menus}
                visible={this.neverShown ? false : this.state.visible}
                onVisibleChange={this.onVisibleChange}
                getPopupContainer={getPopupContainer}
            >
                {this.renderFilterIcon()}
            </Dropdown>
        );
    }
}
