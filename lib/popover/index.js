var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

var Popover = function (_Component) {
    _inherits(Popover, _Component);

    function Popover() {
        _classCallCheck(this, Popover);

        return _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).apply(this, arguments));
    }

    _createClass(Popover, [{
        key: 'getPopupDomNode',
        value: function getPopupDomNode() {
            return this.refs.tooltip.getPopupDomNode();
        }
    }, {
        key: 'getOverlay',
        value: function getOverlay() {
            var _props = this.props,
                title = _props.title,
                prefixCls = _props.prefixCls,
                content = _props.content;

            return React.createElement(
                'div',
                null,
                title && React.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                ),
                React.createElement(
                    'div',
                    { className: prefixCls + '-inner-content' },
                    content
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var props = Object.assign({}, this.props);
            delete props.title;
            return React.createElement(Tooltip, Object.assign({}, props, {
                ref: 'tooltip',
                overlay: this.getOverlay()
            }));
        }
    }]);

    return Popover;
}(Component);

Popover.defaultProps = {
    prefixCls: 'fy-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
};
Popover.propTypes = {
    title: PropTypes.node,
    content: PropTypes.node,
    prefixCls: PropTypes.string,
    overlayClassName: PropTypes.string,
    style: PropTypes.object,
    overlayStyle: PropTypes.object,
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']),
    builtinPlacements: PropTypes.object,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    transitionName: PropTypes.string,
    trigger: PropTypes.oneOf(['hover', 'focus', 'click']),
    openClassName: PropTypes.string,
    arrowPointAtCenter: PropTypes.bool,
    autoAdjustOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        adjustX: PropTypes.oneOf([0, 1]),
        adjustY: PropTypes.oneOf([0, 1])
    })]),
    getTooltipContainer: PropTypes.func,
    getPopupContainer: PropTypes.func,
    children: PropTypes.node
};
export default Popover;