import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

export default class Popover extends Component {
    static defaultProps = {
        prefixCls: 'fy-popover',
        placement: 'top',
        transitionName: 'zoom-big',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
    };

    static propTypes = {
        title: PropTypes.node,
        content: PropTypes.node,
        prefixCls: PropTypes.string,
        overlayClassName: PropTypes.string,
        style: PropTypes.object,
        overlayStyle: PropTypes.object,
        placement: PropTypes.oneOf([
            'top',
            'left',
            'right',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'leftBottom',
            'rightTop',
            'rightBottom'
        ]),
        builtinPlacements: PropTypes.object,
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        transitionName: PropTypes.string,
        trigger: PropTypes.oneOf([
            'hover',
            'focus',
            'click'
        ]),
        openClassName: PropTypes.string,
        arrowPointAtCenter: PropTypes.bool,
        autoAdjustOverflow: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                adjustX: PropTypes.oneOf([0, 1]),
                adjustY: PropTypes.oneOf([0, 1])
            })
        ]),
        getTooltipContainer: PropTypes.func,
        getPopupContainer: PropTypes.func,
        children: PropTypes.node
    };

    getPopupDomNode() {
        return this.refs.tooltip.getPopupDomNode();
    }

    getOverlay() {
        const {title, prefixCls, content} = this.props;
        return (
            <div>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                <div className={`${prefixCls}-inner-content`}>
                    {content}
                </div>
            </div>
        );
    }

    render() {
        const props = {...this.props};
        delete props.title;
        return (
            <Tooltip
                {...props}
                ref="tooltip"
                overlay={this.getOverlay()}
            />
        );
    }
}
