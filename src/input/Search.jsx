import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from './Input';
import Icon from '../icon';

export default class Search extends Component {
    static defaultProps = {
        inputPrefixCls: 'fy-input',
        prefixCls: 'fy-input-search',
        className: PropTypes.string
    };
    static propTypes = {
        inputPrefixCls: PropTypes.string,
        className: PropTypes.string,
        onSearch: PropTypes.func,
        prefixCls: PropTypes.string,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        style: PropTypes.object,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        maxLength: PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        onPressEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        autoComplete: PropTypes.string,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        spellCheck: PropTypes.bool,
        autoFocus: PropTypes.bool
    };

    onSearch = () => {
        const {onSearch} = this.props;
        if (onSearch) {
            onSearch(this.input.refs.input.value);
        }
        this.input.focus();
    };

    onSearch = () => {
        const {onSearch} = this.props;
        if (onSearch) {
            onSearch(this.input.refs.input.value);
        }
        this.input.focus();
    };

    render() {
        const {className, inputPrefixCls, prefixCls, suffix, ...others} = this.props;
        delete others.onSearch;
        const searchIcon = (
            <Icon
                className={`${prefixCls}-icon`}
                onClick={this.onSearch}
                type="search"
                key="searchIcon"
            />
        );
        const searchSuffix = suffix ? [suffix, searchIcon] : searchIcon;
        return (
            <Input
                onPressEnter={this.onSearch}
                {...others}
                className={classNames(prefixCls, className)}
                prefixCls={inputPrefixCls}
                suffix={searchSuffix}
                ref={node => {this.input = node;}}
            />
        );
    }
}
