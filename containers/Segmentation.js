import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../components/Dropdown';
import * as actions from '../actions/SegmentationActions';
require("!style!css!less!../less/dropdown.less");
require("!style!css!less!../less/segmentation.less");

class Segmentation extends Component {

    componentDidMount() {
        window.MP.api.topEvents().done(function(resp) {
            this.props.dispatch(actions.topEventsLoaded(resp.json.map(function(event) { return {label: event, value: event} })));
        }.bind(this));
    }

    render() {
        const { selectedEvent, filters } = this.props.segmentation;
        var filterDom = filters.map(filter => this.renderFilterRow(filters.indexOf(filter), filter));
        var addBtn;
        if (filters.length == 0 || filters[filters.length - 1].selectedValue) {
            addBtn = <button onClick={e => this.props.dispatch(actions.addFilter())}>Add</button>
        }
        return <div>
            <Dropdown
                name="eventSelect"
                options={this.props.segmentation.topEvents}
                onChange={event => this.props.dispatch(actions.selectEvent(event))}
                value={selectedEvent} />
            {filterDom}
            {addBtn}
        </div>
    }

    renderFilterRow(idx, filter) {
        let opDropdown, valueDropdown, toggleBtn;
        let rowPrefix = <label>By</label>
        let isSegment = false;
        let isLastFilter = idx == this.props.segmentation.filters.length - 1;
        if (isLastFilter
            && !filter.selectedOp
            && !filter.selectedValue
            && !filter.isFilter
        ) {
            isSegment = true;
        }


        if (filter.selectedProperty) {
            if (isSegment) {
                toggleBtn = <button onClick={e => this.props.dispatch(actions.segmentToFilter(idx))}>&gt;</button>
            } else {
                rowPrefix = <span>AND | OR</span>;
                opDropdown = <Dropdown
                    options={this.props.segmentation.ops}
                    onChange={op => this.props.dispatch(actions.selectOp(idx, op))}
                    value={filter.selectedOp}/>;

                valueDropdown = <Dropdown
                    options={this.props.segmentation.topValues}
                    onChange={value => this.props.dispatch(actions.selectPropValue(idx, value))}
                    value={filter.selectedValue}/>;

                if (isLastFilter) {
                    toggleBtn = <button onClick={e => this.props.dispatch(actions.filterToSegment(idx))}>&lt;</button>
                }
            }
        }

        return <div className="property-filter-row">
            {rowPrefix}
            <Dropdown
               options={this.props.segmentation.topProperties}
               onChange={property => this.props.dispatch(actions.selectProperty(idx, property))}
               value={filter.selectedProperty} />
            {opDropdown}
            {valueDropdown}
            {toggleBtn}
        </div>
    }
}
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Segmentation);