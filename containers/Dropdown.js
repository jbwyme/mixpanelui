import React, { Component, PropTypes } from 'react';
import { bindActionCreators, createStore } from 'redux';
import { Connector, Provider } from 'react-redux';
import DropdownButton from '../components/DropdownButton';
import * as DropdownActions from '../actions/DropdownActions';
import dropdown from '../reducers/dropdown';

export default class Dropdown extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        width: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
    };

    constructor(...args) {
        super(...args);
        this.store = createStore(dropdown, {
            selected: {label: this.props.placeholder, value: ''}
        });
    }

    render() {
        return (
            <Provider store={this.store}>
                {this.renderConnector.bind(this)}
            </Provider>
        );
    }

    renderConnector() {
        return <Connector select={state => (state)}>
            {this.renderDropdown.bind(this)}
        </Connector>
    }

    renderDropdown(props) {
        var actions = bindActionCreators(DropdownActions, props.dispatch);
        return <DropdownButton
            items={this.props.items}
            width={this.props.width}
            selected={props.selected}
            btnMeasurements={props.btnMeasurements}
            selectItem={actions.selectItem}
            actions={actions}
        />
    }
}