import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Segfilter from '../components/Segfilter';
import * as actions from '../actions/SegmentationActions';
require("!style!css!less!../less/segmentation.less");

class Segmentation extends Component {
    render() {
        return <div id="report_content">
            <div className="report report-segmentation">
                <Segfilter dispatch={this.props.dispatch} segmentation={this.props.segmentation} />
            </div>
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