import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcSteps from 'rc-steps';

export default class Steps extends Component {
    static Step = RcSteps.Step;

    static defaultProps = {
        prefixCls: 'fy-steps',
        iconPrefix: 'fy',
        current: 0
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        iconPrefix: PropTypes.string,
        current: PropTypes.number
    };

    render() {
        return (
            <RcSteps {...this.props} />
        );
    }
}
