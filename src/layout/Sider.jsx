// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: string) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            }
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

/* eslint-disable import/first */
import React, {Component} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import Icon from '../icon';
/* eslint-enable import/first */

const dimensionMap = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px'
};

export default class Sider extends Component {
    static __ANT_LAYOUT_SIDER = true;

    static defaultProps = {
        prefixCls: 'fy-layout-sider',
        collapsible: false,
        defaultCollapsed: false,
        reverseArrow: false,
        width: 200,
        collapsedWidth: 64,
        style: {}
    };

    static propTypes = {
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        collapsible: PropTypes.bool,
        collapsed: PropTypes.bool,
        defaultCollapsed: PropTypes.bool,
        reverseArrow: PropTypes.bool,
        onCollapse: PropTypes.func,
        trigger: PropTypes.node,
        width: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        collapsedWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
        children: PropTypes.node
    };

    static childContextTypes = {
        siderCollapsed: PropTypes.bool
    };

    constructor(props) {
        super(props);
        let matchMedia;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
            this.mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]})`);
        }
        let collapsed;
        if ('collapsed' in props) {
            collapsed = props.collapsed;
        } else {
            collapsed = props.defaultCollapsed;
        }
        this.state = {
            collapsed,
            below: false
        };
    }

    getChildContext() {
        return {
            siderCollapsed: this.state.collapsed
        };
    }

    componentDidMount() {
        if (this.mql) {
            this.mql.addListener(this.responsiveHandler);
            this.responsiveHandler(this.mql);
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('collapsed' in nextProps) {
            this.setState({
                collapsed: nextProps.collapsed
            });
        }
    }

    componentWillUnmount() {
        if (this.mql) {
            this.mql.removeListener(this.responsiveHandler);
        }
    }

    setCollapsed = (collapsed, type) => {
        if (!('collapsed' in this.props)) {
            this.setState({collapsed});
        }
        const {onCollapse} = this.props;
        if (onCollapse) {
            onCollapse(collapsed, type);
        }
    };

    responsiveHandler = mql => {
        this.setState({below: mql.matches});
        if (this.state.collapsed !== mql.matches) {
            this.setCollapsed(mql.matches, 'responsive');
        }
    };

    toggle = () => {
        const collapsed = !this.state.collapsed;
        this.setCollapsed(collapsed, 'clickTrigger');
    };

    belowShowChange = () => {
        this.setState({belowShow: !this.state.belowShow});
    }

    render() {
        const {prefixCls, className,
            collapsible, reverseArrow, trigger, style, width, collapsedWidth,
            ...others
        } = this.props;
        const divProps = omit(others, ['collapsed',
            'defaultCollapsed', 'onCollapse', 'breakpoint']);
        const siderWidth = this.state.collapsed ? collapsedWidth : width;
        // special trigger when collapsedWidth == 0
        const zeroWidthTrigger = collapsedWidth === 0 || collapsedWidth === '0'
            ? (
                <span onClick={this.toggle} className={`${prefixCls}-zero-width-trigger`}>
                    <Icon type="bars" />
                </span>
            )
            : null;
        const iconObj = {
            expanded: reverseArrow ? <Icon type="right" /> : <Icon type="left" />,
            collapsed: reverseArrow ? <Icon type="left" /> : <Icon type="right" />
        };
        const status = this.state.collapsed ? 'collapsed' : 'expanded';
        const defaultTrigger = iconObj[status];
        const triggerDom = (
            trigger !== null ?
                zeroWidthTrigger || (
                    <div className={`${prefixCls}-trigger`} onClick={this.toggle} style={{width: siderWidth}}>
                        {trigger || defaultTrigger}
                    </div>
                ) : null
        );
        const divStyle = {
            ...style,
            flex: `0 0 ${siderWidth}px`,
            maxWidth: `${siderWidth}px`, // Fix width transition bug in IE11
            minWidth: `${siderWidth}px`, // https://github.com/ant-design/ant-design/issues/6349
            width: `${siderWidth}px`
        };
        const siderCls = classNames(className, prefixCls, {
            [`${prefixCls}-collapsed`]: !!this.state.collapsed,
            [`${prefixCls}-has-trigger`]: !!trigger,
            [`${prefixCls}-below`]: !!this.state.below,
            [`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === '0'
        });
        return (
            <div className={siderCls} {...divProps} style={divStyle}>
                <div className={`${prefixCls}-children`}>{this.props.children}</div>
                {collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null}
            </div>
        );
    }
}
