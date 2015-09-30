import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../components/dropdowns/Dropdown';
import PropertyTypeDropdown from '../components/dropdowns/PropertyTypeDropdown';
import * as actions from '../actions/SegmentationActions';
import classNames from 'classnames';

require("!style!css!less!../less/segfilter.less");

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
        var leftLabels = [];
        var numRealFilters = hasSegment ? filters.length - 1 : filters.length;
        if (numRealFilters > 1) {
            let andClass = classNames({
                toggle_side: true,
                active: filterOp === 'and'
            });

            let orClass = classNames({
                toggle_side: true,
                active: filterOp === 'or'
            });

            leftLabels.push(
                <div className="bool_op toggle_container" onClick={e => this.props.dispatch(actions.toggleFilterOp())}>
                    <div className="toggle">
                        <div className={andClass} style={{minWidth: 30 + 'px'}}>AND</div>
                        <div className={orClass} style={{minWidth: 30 + 'px'}}>OR</div>
                    </div>
                </div>
            )
        }

        for(var i = 0; i < numRealFilters - 2; i++) {
            leftLabels.push(<div className="seg_label">{filterOp}</div>);
        }

        if (hasSegment) {
            leftLabels.push(<div className="action_label">By</div>);
        }

        return <div>
            <div className="segfilter">
                <div className="sf_bar top">
                    <div className="event_select">
                        <Dropdown
                            name="eventSelect"
                            options={topEvents}
                            onChange={event => this.props.dispatch(actions.selectEvent(event))}
                            value={selectedEvent} />
                    </div>
                    <div className="bookmark_picker_container bookmarks_menu_widget">
                        <div className="bookmark_picker bookmarks_menu_widget">
                            <div className="bookmarks_dropdown_widget">
                                <div
                                     className="bookmarks_menu dropdown_label_widget menu_button">
                                    <div className="icon"></div>
                                    <div className="text">Bookmarks</div>
                                </div>
                            </div>
                            <div className="bookmarks_add_widget">
                                <div
                                     className="bookmarks_add_label dropdown_label_widget add_button">
                                    <div className="icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sf_wrapper" style={{display: 'block'}}>
                    <div className="labels">
                        <div className="grey_vert" style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none'}}></div>
                        <div className="grey_horz" style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none'}}></div>
                        <div className="seg_label" style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none', visibility: 'hidden'}}>x</div>
                        {leftLabels}
                    </div>
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

                switch(filter.propType.value) {
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
                onChange={property => this.props.dispatch(actions.selectProperty(idx, property))}
                value={filter.propType} />

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