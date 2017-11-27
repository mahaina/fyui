import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BreadcrumbItem extends Component {

    static __FY_BREADCRUMB_ITEM = true;

    static defaultProps = {
        prefixCls: 'fy-breadcrumb',
        separator: '/'
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        separator: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        href: PropTypes.string,
        children: PropTypes.node
    }

    render() {
        const {prefixCls, separator, children, ...restProps} = this.props;
        let link;
        if ('href' in this.props) {
            link = <a className={`${prefixCls}-link`} {...restProps}>{children}</a>;
        } else {
            link = <span className={`${prefixCls}-link`} {...restProps}>{children}</span>;
        }

        if (children) {
            return (
                <span>
                    {link}
                    <span className={`${prefixCls}-separator`}>{separator}</span>
                </span>
            );
        }
        return null;
    }
}
