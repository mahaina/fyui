import * as React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';

export default class Rate extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        character: PropTypes.node
    };

    static defaultProps = {
        prefixCls: 'fy-rate',
        character: <Icon type="star" />
    };

    constructor(...args) {
        super(...args);
        this.saveRate = this.saveRate.bind(this);
    }

    focus() {
        this.rcRate.focus();
    }

    blur() {
        this.rcRate.blur();
    }

    saveRate(node) {
        this.rcRate = node;
    }

    render() {
        return <RcRate ref={this.saveRate} {...this.props} />;
    }
}
