import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
    // Check the child if is undefined or null.
    if (child == null) {
        return;
    }
    const SPACE = needInserted ? ' ' : '';
    // strictNullChecks oops.
    if (typeof child !== 'string' && typeof child !== 'number' &&
        isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {},
            child.props.children.split('').join(SPACE));
    }
    if (typeof child === 'string') {
        if (isTwoCNChar(child)) {
            child = child.split('').join(SPACE);
        }
        return <span>{child}</span>;
    }
    return child;
}

export default class Button extends Component {
    static __FY_BUTTON = true;

    static defaultProps = {
        prefixCls: 'fy-btn',
        loading: false,
        ghost: false
    };

    static propTypes = {
        type: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger']),
        shape: PropTypes.oneOf(['circle', 'circle-outline']),
        size: PropTypes.oneOf(['large', 'small']),
        className: PropTypes.string,
        htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
        children: PropTypes.node,
        icon: PropTypes.string,
        prefixCls: PropTypes.string,
        ghost: PropTypes.bool,
        loading: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                delay: PropTypes.number
            })
        ]),
        disabled: PropTypes.bool,
        style: PropTypes.object,
        onClick: PropTypes.func,
        onMouseUp: PropTypes.func,
        onMouseDown: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            clicked: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const currentLoading = this.props.loading;
        const loading = nextProps.loading;

        if (currentLoading) {
            clearTimeout(this.delayTimeout);
        }

        if (typeof loading !== 'boolean' && loading && loading.delay) {
            this.delayTimeout = setTimeout(() => this.setState({loading}), loading.delay);
        } else {
            this.setState({loading});
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }

    handleClick = e => {
        // Add click effect
        this.setState({clicked: true});
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.setState({clicked: false}), 500);

        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }

    render() {
        const {
            type,
            shape,
            size,
            className,
            htmlType,
            children,
            icon,
            prefixCls,
            ghost,
            ...others
        } = this.props;

        const {loading, clicked} = this.state;

        // large => lg
        // small => sm
        let sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
                break;
            default:
                break;
        }

        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-clicked`]: clicked,
            [`${prefixCls}-background-ghost`]: ghost
        });

        const iconType = loading ? 'loading' : icon;
        const iconNode = iconType ? <Icon type={iconType} /> : null;
        const needInserted = React.Children.count(children) === 1 && (!iconType || iconType === 'loading');
        const kids = React.Children.map(children, child => insertSpace(child, needInserted));

        return (
            <button
                {...omit(others, ['loading'])}
                type={htmlType || 'button'}
                className={classes}
                onClick={this.handleClick}
            >
                {iconNode}{kids}
            </button>
        );
    }
}
