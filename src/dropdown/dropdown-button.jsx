import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';

const ButtonGroup = Button.Group;

export default class DropdownButton extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['primary', 'ghost', 'dashed']),
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        children: PropTypes.any,
        placement: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        trigger: PropTypes.any,
        align: PropTypes.any,
        onVisibleChange: PropTypes.func,
        visible: PropTypes.any,
        overlay: PropTypes.any,
        getPopupContainer: PropTypes.any
    };

    static defaultProps = {
        placement: 'bottomRight',
        type: 'default',
        prefixCls: 'fy-dropdown-button'
    };

    render() {
        const {
            type, disabled, onClick, children,
            prefixCls, className, overlay, trigger, align,
            visible, onVisibleChange, placement, getPopupContainer,
            ...restProps
        } = this.props;

        const dropdownProps = {
            align,
            overlay,
            trigger: disabled ? [] : trigger,
            onVisibleChange,
            placement,
            getPopupContainer
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }

        return (
            <ButtonGroup
                {...restProps}
                className={classNames(prefixCls, className)}
            >
                <Button
                    type={type}
                    disabled={disabled}
                    onClick={onClick}
                >
                    {children}
                </Button>
                <Dropdown {...dropdownProps}>
                    <Button type={type} disabled={disabled}>
                        <Icon type="down" />
                    </Button>
                </Dropdown>
            </ButtonGroup>
        );
    }
}
