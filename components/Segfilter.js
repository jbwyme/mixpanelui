import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../components/Dropdown';
import * as actions from '../actions/SegmentationActions';
require("!style!css!less!../less/segfilter.less");

export default class Segfilter extends Component {

    _isSegment(filter) {
        return !filter.selectedOp
            && !filter.selectedValue
            && !filter.isFilter
    }

    render() {
        const { topEvents, selectedEvent, filters } = this.props.segmentation;
        var filterDom = filters.map(filter => this.renderFilterRow(filters.indexOf(filter), filter));
        var lastFilter = filters[filters.length - 1];
        var hasSegment = this._isSegment(lastFilter);
        var leftLabels = [];
        var numRealFilters = hasSegment ? filters.length - 1 : filters.length;
        if (numRealFilters > 1) {
            leftLabels.push(
                <div className="bool_op toggle_container" id="jswidget_355632324" val="and">
                    <div className="toggle">
                        <div id="jswidget_122149309" className="toggle_side active" val="and"
                             style={{minWidth: 30 + 'px'}}>AND
                        </div>
                        <div id="jswidget_401154606" className="toggle_side" val="or"
                             style={{minWidth: 30 + 'px'}}>OR
                        </div>
                    </div>
                </div>
            )
        }

        for(var i = 0; i < numRealFilters - 2; i++) {
            leftLabels.push(<div className="seg_label">and</div>);
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
                        <div className="bookmark_picker bookmarks_menu_widget" id="jswidget_287665625">
                            <div id="jswidget_647457852" className="bookmarks_dropdown_widget">
                                <div id="jswidget_524724402"
                                     className="bookmarks_menu dropdown_label_widget menu_button">
                                    <div className="icon"></div>
                                    <div className="text">Bookmarks</div>
                                </div>
                            </div>
                            <div id="jswidget_800821239" className="bookmarks_add_widget">
                                <div id="jswidget_874419217"
                                     className="bookmarks_add_label dropdown_label_widget add_button">
                                    <div className="icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sf_wrapper" style={{display: 'block'}}>
                    <div className="labels">
                        <div className="grey_vert" style={{display: 'block'}}></div>
                        <div className="grey_horz" style={{display: 'block'}}></div>
                        <div className="seg_label" style={{visibility: 'hidden'}}>x</div>
                        {leftLabels}


                    </div>
                    <div className="rows">
                        {filterDom}
                    </div>
                    <div className="new_row" onClick={e => this.props.dispatch(actions.addFilter())} style={{display: hasSegment ? 'none' : 'block'}}>
                        <div className="grey_vert"
                             style={{display: 'block'}}></div>
                    </div>
                    <div className="sf_overlay"></div>
                </div>
                <div className="sf_second_dimension">
                    <div className="add_second_dimension">
                        <div className="add_button add_copy"><span
                            className="plus">+</span>Segment by another
                            dimension
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

        if (filter.selectedProperty) {
            if (isSegment) {
                toggleBtn = <a className="expand" onClick={e => this.props.dispatch(actions.segmentToFilter(idx))}></a>
            } else {
                opDropdown = <Dropdown
                    options={this.props.segmentation.ops}
                    onChange={op => this.props.dispatch(actions.selectOp(idx, op))}
                    value={filter.selectedOp}/>;

                valueDropdown = <Dropdown
                    options={this.props.segmentation.topValues}
                    onChange={value => this.props.dispatch(actions.selectPropValue(idx, value))}
                    value={filter.selectedValue}/>;

                if (isLastFilter) {
                    toggleBtn = <a className="contract" onClick={e => this.props.dispatch(actions.filterToSegment(idx))}></a>
                }
            }
        }

        return <div id="jswidget_775439018" className="property_filter typecasting">
            <Dropdown
                options={this.props.segmentation.topProperties}
                onChange={property => this.props.dispatch(actions.selectProperty(idx, property))}
                value={filter.selectedProperty} />

            <div className="typecast_dropdown prop_filter icon_dropdown"
                 id="jswidget_217356736">

            </div>
            <div className="rule">
                {opDropdown}
                {valueDropdown}
            </div>

            {toggleBtn}

            <div className="delete_button icon_button delete"
                 id="jswidget_715154971">
                <div className="icon"></div>
            </div>
            <div className="insert_row"><img
                src="//cdn.mxpnl.com/cache/04a16f345b049e96473cc87f01e61808/images/reports/funnels3/plus_small.png"/>
                <div className="line"></div>
            </div>
        </div>
    }
}