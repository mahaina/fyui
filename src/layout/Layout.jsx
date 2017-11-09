import React, {Component} from 'react';
import classNames from 'classnames';

/* eslint-disable react/prop-types,react/prefer-stateless-function */
function generator(props) {
    return BacicComponent => {
        return class Adapter extends Component {
            render() {
                const {prefixCls} = props;
                return <BacicComponent prefixCls={prefixCls} {...this.props} />;
            }
        };
    };
}

const Basic = props => {
    const {prefixCls, className, children, ...others} = props;
    let hasSider;
    React.Children.forEach(children, element => {
        if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
            hasSider = true;
        }
    });
    const divCls = classNames(className, prefixCls, {
        [`${prefixCls}-has-sider`]: hasSider
    });
    return (
        <div className={divCls} {...others}>{children}</div>
    );
};
/* eslint-enable react/prop-types,react/prefer-stateless-function */

const Layout = generator({
    prefixCls: 'fy-layout'
})(Basic);

const Header = generator({
    prefixCls: 'fy-layout-header'
})(Basic);

const Footer = generator({
    prefixCls: 'fy-layout-footer'
})(Basic);

const Content = generator({
    prefixCls: 'fy-layout-content'
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
