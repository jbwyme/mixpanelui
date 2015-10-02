import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../dropdowns/Dropdown';
import * as PropertyTypes from '../../constants/PropertyTypes'
import PropertyTypeDropdown from '../dropdowns/PropertyTypeDropdown';
import EventSelect from './EventSelect'
import Bookmarks from './Bookmarks'
import FilterLabels from './FilterLabels'
import * as actions from '../../actions/SegfilterActions';
import classNames from 'classnames';

import * as PropertyOperators from '../../constants/PropertyOperators.js'

require("!style!css!less!../../less/segfilter.less");

export default class Segfilter extends Component {

    _isSegment(filter) {
        return !filter.op
            && !filter.value
            && !filter.isFilter
    }

    componentWillMount() {
        Segfilter.maybeAddFilter(this.props.segfilter.filters, this.props.dispatch);
    }
    componentWillReceiveProps(nextProps) {
        Segfilter.maybeAddFilter(nextProps.segfilter.filters, this.props.dispatch);
    }

    static maybeAddFilter(filters, dispatch) {
        if (filters.length === 0) {
            dispatch(actions.addFilter())
        }
    }

    render() {
        const { selectedEvent, filters, filterOp } = this.props.segfilter;
        const { topEvents } = this.props.segmentation;
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
        let operator, valueDropdown, toggleBtn;
        let isLastFilter = idx == this.props.segfilter.filters.length - 1;
        let isSegment = isLastFilter && this._isSegment(filter);

        if (filter.property) {
            if (isSegment) {
                toggleBtn = <a className="expand" onClick={e => this.props.dispatch(actions.expandFilter(idx))}></a>
            } else {
                var opDropdown = <Dropdown
                    options={PropertyOperators[filter.property.type]}
                    onChange={op => this.props.dispatch(actions.selectOp(idx, op))}
                    value={filter.op} />;

                switch(filter.property.type) {
                    case PropertyTypes.STRING:
                        operator = opDropdown;
                        break;
                    case PropertyTypes.BOOLEAN:
                        operator = <div className="inline_text">is</div>;
                        break;
                    case PropertyTypes.NUMBER:
                        operator = ([
                            <div className="inline_text">is</div>,
                            opDropdown
                        ]);
                        break;
                    case PropertyTypes.DATE:
                        operator = ([
                            <div className="inline_text">was</div>,
                            opDropdown
                        ]);
                        break;
                    case PropertyTypes.LIST:
                        operator = <div className="inline_text">contains</div>;
                        break;
                    default:
                        throw "Unknown property type: " + filter.property.type;
                }

                valueDropdown = <Dropdown
                    options={this.props.segmentation.topPropertyValues[filter.property.value]}
                    onChange={value => this.props.dispatch(actions.selectPropValue(idx, value))}
                    value={filter.value}/>;

                if (isLastFilter) {
                    toggleBtn = <a className="contract" onClick={e => this.props.dispatch(actions.collapseFilter(idx))}></a>
                }
            }
        }

        let propTypeVal = filter.property ? filter.property.type : null;
        return <div className="property_filter typecasting">
            <Dropdown
                options={this.props.segmentation.topProperties}
                onChange={property => this.props.dispatch(actions.selectProperty(idx, property))}
                value={filter.property} />

            <PropertyTypeDropdown
                onChange={type => this.props.dispatch(actions.castPropertyType(idx, type))}
                value={propTypeVal} disabled={!!filter.property} />

            <div className="rule">
                {operator}
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