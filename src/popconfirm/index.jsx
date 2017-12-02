import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';

export default class Popconfirm extends Component {
    static defaultProps = {
        prefixCls: 'ant-popover',
        transitionName: 'zoom-big',
        placement: 'top',
        trigger: 'click',
        okType: 'primary'
    };

    static propTypes = {
        visible: PropTypes.bool,
        transitionName: PropTypes.string,
        placement: PropTypes.string,
        prefixCls: PropTypes.string,
        trigger: PropTypes.string,
        title: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        okText: PropTypes.node,
        okType: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger']),
        cancelText: PropTypes.node
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible
        };

        this.tooltip = null;
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({visible: nextProps.visible});
        }
    }

    onConfirm = e => {
        this.setVisible(false);

        const {onConfirm} = this.props;
        if (onConfirm) {
            onConfirm.call(this, e);
        }
    };

    onCancel = e => {
        this.setVisible(false);

        const {onCancel} = this.props;
        if (onCancel) {
            onCancel.call(this, e);
        }
    };

    onVisibleChange = visible => {
        this.setVisible(visible);
    };

    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }

    setVisible(visible) {
        const props = this.props;
        if (!('visible' in props)) {
            this.setState({visible});
        }

        const {onVisibleChange} = props;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
    }

    saveTooltip = node => {
        this.tooltip = node;
    };

    renderOverlay = popconfirmLocale => {
        const {prefixCls, title, cancelText, okText, okType} = this.props;
        return (
            <div>
                <div className={`${prefixCls}-inner-content`}>
                    <div className={`${prefixCls}-message`}>
                        <Icon type="exclamation-circle" />
                        <div className={`${prefixCls}-message-title`}>{title}</div>
                    </div>
                    <div className={`${prefixCls}-buttons`}>
                        <Button onClick={this.onCancel} size="small">
                            {cancelText || popconfirmLocale.cancelText}
                        </Button>
                        <Button onClick={this.onConfirm} type={okType} size="small">
                            {okText || popconfirmLocale.okText}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {prefixCls, placement, ...restProps} = this.props;

        const overlay = <div>{this.renderOverlay}</div>;

        return <Tooltip {...restProps} prefixCls={prefixCls} placement={placement} onVisibleChange={this.onVisibleChange} visible={this.state.visible} overlay={overlay} ref={this.saveTooltip} />;
    }
}
