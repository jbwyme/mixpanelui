import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../dropdowns/Dropdown';
import PropertyTypeDropdown from '../dropdowns/PropertyTypeDropdown';
import EventSelect from './EventSelect'
import Bookmarks from './Bookmarks'
import FilterLabels from './FilterLabels'
import * as actions from '../../actions/SegmentationActions';
import classNames from 'classnames';

require("!style!css!less!../../less/segfilter.less");

export default class Segfilter extends Component {

    _isSegment(filter) {
        return !filter.op
            && !filter.value
            && !filter.isFilter
    }

    render() {
        const { topEvents, selectedEvent, filters, filterOp } = this.props.segmentation;
        var filterDom = filters.map(filter => this.renderFilterRow(filters.indexOf(filter), filter));
        var lastFilter = filters[filters.length - 1];
        var hasSegment = lastFilter && this._isSegment(lastFilter);

        return <div className="segfilter">
                <div className="sf_bar top">
                    <EventSelect
                        events={topEvents}
                        value={selectedEvent}
                        onChange={event => this.props.dispatch(actions.selectEvent(event))} />
                    <Bookmarks />
                </div>
                <div className="sf_wrapper" style={{display: 'block'}}>
                    <FilterLabels
                        filters={filters}
                        hasSegment={hasSegment}
                        filterOp={filterOp}
                        onFilterOpToggle={e => this.props.dispatch(actions.toggleFilterOp())} />

                    <div className="rows">
                        {filterDom}
                    </div>
                    <div className="new_row" onClick={e => this.props.dispatch(actions.addFilter())} style={{display: hasSegment ? 'none' : 'block'}}>
                        <div className="grey_vert" style={{display: 'block'}}></div>
                    </div>
                    <div className="sf_overlay"></div>
                </div>
                <div className="sf_second_dimension">
                    <div className="add_second_dimension">
                        <div className="add_button add_copy"><span
                            className="plus">+</span>Segment by another dimension
                        </div>
                    </div>
                    <div style={{display: 'none'}}
                         className="pick_second_dimension">
                        <div className="subseg_label">By</div>
                        <div className="subsegment_row"></div>
                    </div>
                </div>
                <div className="sf_bar bottom">
                    <div className="button_primary button show">SHOW</div>
                    <div className="sf_overlay"></div>
                </div>
            </div>
    }

    renderFilterRow(idx, filter) {
        let opDropdown, valueDropdown, toggleBtn;
        let isLastFilter = idx == this.props.segmentation.filters.length - 1;
        let isSegment = isLastFilter && this._isSegment(filter);

        if (filter.property) {
            if (isSegment) {
                toggleBtn = <a className="expand" onClick={e => this.props.dispatch(actions.segmentToFilter(idx))}></a>
            } else {

                switch(filter.property.type) {
                    case 'boolean':
                        opDropdown = <div className="inline_text">is</div>;
                        break;
                    default:
                        opDropdown = <Dropdown
                            options={this.props.segmentation.ops}
                            onChange={op => this.props.dispatch(actions.selectOp(idx, op))}
                            value={filter.op}/>;
                }


                valueDropdown = <Dropdown
                    options={this.props.segmentation.topValues}
                    onChange={value => this.props.dispatch(actions.selectPropValue(idx, value))}
                    value={filter.value}/>;

                if (isLastFilter) {
                    toggleBtn = <a className="contract" onClick={e => this.props.dispatch(actions.filterToSegment(idx))}></a>
                }
            }
        }

        return <div className="property_filter typecasting">
            <Dropdown
                options={this.props.segmentation.topProperties}
                onChange={property => this.props.dispatch(actions.selectProperty(idx, property))}
                value={filter.property} />

            <PropertyTypeDropdown
                onChange={type => this.props.dispatch(actions.castPropertyType(idx, type))}
                value={filter.property.type} />

            <div className="rule">
                {opDropdown}
                {valueDropdown}
            </div>

            {toggleBtn}

            <div className="delete_button icon_button delete" onClick={e => this.props.dispatch(actions.removeFilter(idx))}>
                <div className="icon"></div>
            </div>
            <div className="insert_row"  onClick={e => this.props.dispatch(actions.addFilter(idx))}>
                <img src="//cdn.mxpnl.com/cache/04a16f345b049e96473cc87f01e61808/images/reports/funnels3/plus_small.png"/>
                <div className="line"></div>
            </div>
        </div>
    }
}