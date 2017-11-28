import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';
import Radio from '../radio';


export default class SelectionBox extends Component {
    static propTypes = {
        store: PropTypes.object,
        type: PropTypes.string,
        /* eslint-disable react/no-unused-prop-types */
        defaultSelection: PropTypes.arrayOf(PropTypes.string),
        rowIndex: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            checked: this.getCheckState(props)
        };
    }

    componentDidMount() {
        this.subscribe();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    getCheckState = props => {
        const {store, defaultSelection, rowIndex} = props;
        let checked = false;
        if (store.getState().selectionDirty) {
            checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
        } else {
            checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 defaultSelection.indexOf(rowIndex) >= 0);
        }
        return checked;
    }

    subscribe() {
        const store = this.props.store;
        this.unsubscribe = store.subscribe(() => {
            const checked = this.getCheckState(this.props);
            this.setState({checked});
        });
    }

    render() {
        const {type, rowIndex, disabled, onChange} = this.props;
        const {checked} = this.state;

        if (type === 'radio') {
            return (
                <Radio
                    disabled={disabled}
                    onChange={onChange}
                    value={rowIndex}
                    checked={checked}
                />
            );
        }

        return (
            <Checkbox
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
        );
    }
}
