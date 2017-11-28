import React, {Component, cloneElement} from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import warning from '../_util/warning';


export default class Dropdown extends Component {
    static propTypes = {
        trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover'])),
        overlay: PropTypes.node,
        style: PropTypes.object,
        onVisibleChange: PropTypes.func,
        visible: PropTypes.bool,
        disabled: PropTypes.bool,
        align: PropTypes.object,
        getPopupContainer: PropTypes.func,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.object,
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        placement: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'])
    };
    static defaultProps = {
        prefixCls: 'fy-dropdown',
        mouseEnterDelay: 0.15,
        mouseLeaveDelay: 0.1,
        placement: 'bottomLeft'
    };

    componentDidMount() {
        const overlay = this.props.overlay;
        const overlayProps = overlay.props;
        warning(
            !overlayProps.mode || overlayProps.mode === 'vertical',
            `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`,
        );
    }
    getTransitionName() {
        const {placement = ''} = this.props;
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    }

    render() {
        const {children, prefixCls, overlay, trigger, disabled} = this.props;
        const dropdownTrigger = cloneElement(children, {
            className: classNames(children.props.className, `${prefixCls}-trigger`),
            disabled
        });
        // menu cannot be selectable in dropdown defaultly
        const overlayProps = overlay && overlay.props;
        const selectable = (overlayProps && 'selectable' in overlayProps)
            ? overlayProps.selectable : false;
        const fixedModeOverlay = cloneElement(overlay, {
            mode: 'vertical',
            selectable
        });
        return (
            <RcDropdown
                {...this.props}
                transitionName={this.getTransitionName()}
                trigger={disabled ? [] : trigger}
                overlay={fixedModeOverlay}
            >
                {dropdownTrigger}
            </RcDropdown>
        );
    }
}
