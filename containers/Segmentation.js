import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Segfilter from '../components/segfilter';
import * as actions from '../actions/SegmentationActions';

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