import React, {PureComponent} from 'react';
import RcPagination from 'rc-pagination';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from '../select';
import MiniSelect from './MiniSelect';

export default class Pagination extends PureComponent {
    static propTypes = {
        total: PropTypes.number,
        defaultCurrent: PropTypes.number,
        current: PropTypes.number,
        defaultPageSize: PropTypes.number,
        pageSize: PropTypes.number,
        onChange: PropTypes.func,
        // showSizeChanger: PropTypes.boolean,
        pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
        onShowSizeChange: PropTypes.func,
        // showQuickJumper: PropTypes.boolean,
        showTotal: PropTypes.func,
        size: PropTypes.string,
        style: PropTypes.object,
        // locale: PropTypes.Object,
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        selectPrefixCls: PropTypes.string,
        itemRender: PropTypes.func
    };

    static defaultProps = {
        prefixCls: 'fy-pagination',
        selectPrefixCls: 'fy-select'
    };

    render() {
        const {className, size, ...restProps} = this.props;
        const isSmall = size === 'small';
        return (
            <RcPagination
                {...restProps}
                className={classNames(className, {mini: isSmall})}
                selectComponentClass={isSmall ? MiniSelect : Select}
            />
        );
    }
}
