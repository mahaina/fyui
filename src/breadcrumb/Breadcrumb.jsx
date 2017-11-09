import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';

export default class Breadcrumb extends Component {
    static defaultProps = {
        prefixCls: 'fy-breadcrumb',
        separator: '/'
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        separator: PropTypes.node,
        className: PropTypes.string,
        style: PropTypes.object,
        children: PropTypes.node
    };

    render() {
        const {
            separator,
            prefixCls,
            style,
            className,
            children
        } = this.props;

        const crumbs = React.Children.map(children, (element, index) => {
            if (!element) {
                return element;
            }
            warning(
                element.type && element.type.__FY_BREADCRUMB_ITEM,
                'Breadcrumb only accepts Breadcrumb.Item as it\'s children'
            );
            return cloneElement(element, {
                separator,
                key: index
            });
        });

        return (
            <div className={classNames(className, prefixCls)} style={style}>
                {crumbs}
            </div>
        );
    }

}
