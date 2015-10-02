import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Segfilter from '../components/segfilter';
import * as actions from '../actions/SegmentationActions';

class Segmentation extends Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchTopEvents());
        this.maybeFetchTopProperties(this.props);
        this.maybeFetchTopPropertyValues(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.maybeFetchTopProperties(nextProps);
        this.maybeFetchTopPropertyValues(nextProps);
    }

    maybeFetchTopProperties(props) {
        let event = props.segfilter.selectedEvent;
        let topProps = props.segmentation.topProperties;
        if (event && !topProps[event.value]) {
            debugger;
            props.dispatch(actions.fetchTopProperties(event.value));
        }
    }

    maybeFetchTopPropertyValues(props) {
        if (props.segfilter.filters.length > 0) {
            props.segfilter.filters.forEach(function(f) {
                if (f.property && !props.segmentation.topPropertyValues[f.property.value]) {
                    props.dispatch(actions.fetchTopPropertyValues(props.segfilter.selectedEvent.value, f.property.value))
                }
            });
        }
    }

    render() {
        return <div id="report_content">
            <div className="report report-segmentation">
                <Segfilter
                    dispatch={this.props.dispatch}
                    segfilter={this.props.segfilter}
                    segmentation={this.props.segmentation} />
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