import React, {Component} from 'react';
import Dialog from 'rc-dialog';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Button from '../button';

let mousePosition;
let mousePositionEventBinded;

export default class Modal extends Component {

    static defaultProps = {
        prefixCls: 'ant-modal',
        width: 520,
        transitionName: 'zoom',
        maskTransitionName: 'fade',
        confirmLoading: false,
        visible: false,
        okType: 'primary'
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        visible: PropTypes.bool,
        confirmLoading: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        closable: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        afterClose: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        footer: PropTypes.node,
        okText: PropTypes.string,
        okType: PropTypes.oneOf(['primary', 'ghost', 'dashed', 'danger']),
        cancelText: PropTypes.string,
        maskClosable: PropTypes.bool,
        style: PropTypes.object,
        wrapClassName: PropTypes.string,
        maskTransitionName: PropTypes.string,
        transitionName: PropTypes.string,
        className: PropTypes.string,
        getContainer: PropTypes.func,
        zIndex: PropTypes.number
    };

    static contextTypes = {
        antLocale: PropTypes.object
    };


    componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        addEventListener(document.documentElement, 'click', (e: MouseEvent) => {
            mousePosition = {
                x: e.pageX,
                y: e.pageY
            };
            // 100ms 内发生过点击事件，则从点击位置动画展示
            // 否则直接 zoom 展示
            // 这样可以兼容非点击方式展开
            setTimeout(() => {mousePosition = null;}, 100);
        });
        mousePositionEventBinded = true;
    }
    handleCancel = e => {
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel(e);
        }
    }

    handleOk = e => {
        const onOk = this.props.onOk;
        if (onOk) {
            onOk(e);
        }
    }

    render() {
        let {okText, cancelText} = this.props;
        const {okType, confirmLoading, footer, visible} = this.props;
        if (this.context.antLocale && this.context.antLocale.Modal) {
            okText = okText || this.context.antLocale.Modal.okText;
            cancelText = cancelText || this.context.antLocale.Modal.cancelText;
        }
        /* eslint-disable react/jsx-closing-tag-location */
        const defaultFooter = [
            (<Button
                key="cancel"
                size="large"
                onClick={this.handleCancel}
            >
                {cancelText || '取消'}
            </Button>),
            (<Button
                key="confirm"
                type={okType}
                size="large"
                loading={confirmLoading}
                onClick={this.handleOk}
            >
                {okText || '确定'}
            </Button>)];

        return (
            <Dialog
                onClose={this.handleCancel}
                footer={footer === undefined ? defaultFooter : footer}
                {...this.props}
                visible={visible}
                mousePosition={mousePosition}
            />
        );
    }
}
