import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import omit from 'omit.js';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import Icon from '../icon';

export default class Spin extends Component {
    static defaultProps = {
        prefixCls: 'fy-spin',
        spinning: true,
        size: 'default',
        wrapperClassName: ''
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        spinning: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        wrapperClassName: PropTypes.string,
        children: PropTypes.node,
        delay: PropTypes.number,
        tip: PropTypes.string
    };

    constructor(props) {
        super(props);
        const spinning = props.spinning;
        this.state = {spinning};
    }

    componentDidMount() {
        if (!isCssAnimationSupported()) {
            // Show text in IE8/9
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({notCssAnimationSupported: true});
            /* eslint-enable react/no-did-mount-set-state */
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        const {delay} = this.props;

        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
            this.debounceTimeout = setTimeout(() => this.setState({spinning}), 200);
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        /* eslint-disable no-restricted-globals */
        } else if (spinning && delay && !isNaN(Number(delay))) {
        /* eslint-enable no-restricted-globals */
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
            this.delayTimeout = setTimeout(() => this.setState({spinning}), delay);
        } else {
            this.setState({spinning});
        }
    }

    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }

    isNestedPattern() {
        return !!(this.props && this.props.children);
    }

    render() {
        const {className, size, prefixCls, tip, wrapperClassName, ...restProps} = this.props;
        const {spinning, notCssAnimationSupported} = this.state;

        const spinClassName = classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === 'small',
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-spinning`]: spinning,
            [`${prefixCls}-show-text`]: !!tip || notCssAnimationSupported
        }, className);

        // fix https://fb.me/react-unknown-prop
        const divProps = omit(restProps, [
            'spinning',
            'delay'
        ]);

        const spinElement = (
            <div {...divProps} className={spinClassName} >
                <Icon className={`${prefixCls}-icon`} type="loading" />
                {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
            </div>
        );
        if (this.isNestedPattern()) {
            let animateClassName = `${prefixCls}-nested-loading`;
            if (wrapperClassName) {
                animateClassName += ` ${wrapperClassName}`;
            }
            const containerClassName = classNames({
                [`${prefixCls}-container`]: true,
                [`${prefixCls}-blur`]: spinning
            });
            return (
                <Animate
                    {...divProps}
                    component="div"
                    className={animateClassName}
                    style={null}
                    transitionName="fade"
                >
                    {spinning && <div key="loading">{spinElement}</div>}
                    <div className={containerClassName} key="container">
                        {this.props.children}
                    </div>
                </Animate>
            );
        }
        return spinElement;
    }
}
