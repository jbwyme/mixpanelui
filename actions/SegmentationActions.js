import * as types from '../constants/SegmentationActionTypes';

export function requestTopEvents() {
    return {
        type: types.REQUEST_TOP_EVENTS
    }
}

export function receiveTopEvents(events) {
    return {
        type: types.RECEIVE_TOP_EVENTS,
        events: events
    }
}

export function topEventsLoadFailure(err) {
    return {
        type: types.TOP_EVENTS_LOAD_FAILURE,
        err: err
    }
}

export function fetchTopEvents() {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function(dispatch) {
        dispatch(requestTopEvents());
        return window.MP.api.topEvents()
            .then(response => response.json)
            .then(vals => vals.map(function(e) { return {label: e, value: e}}))
            .then(topEvents => dispatch(receiveTopEvents(topEvents)))
            .fail(err => dispatch(topEventsLoadFailure(err)));
    };
}

export function requestTopProperties() {
    return {
        type: types.REQUEST_TOP_PROPERTIES
    }
}

export function receiveTopProperties(event, properties) {
    return {
        type: types.RECEIVE_TOP_PROPERTIES,
        event: event,
        properties: properties
    }
}

export function topPropertiesLoadFailure(err) {
    return {
        type: types.TOP_PROPERTIES_LOAD_FAILURE,
        err: err
    }
}

export function fetchTopProperties(event) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function(dispatch) {
        dispatch(requestTopProperties());
        return window.MP.api.topProperties(event)
            .then(response => response.json)
            .then(propCounts =>Object.keys(propCounts).map(function(prop) { return {label: prop, value: prop, type: 'STRING'}}))
            .then(topProperties => dispatch(receiveTopProperties(topProperties)))
            .fail(err => dispatch(topPropertiesLoadFailure(err)));
    };
}


export function requestTopPropertyValues() {
    return {
        type: types.REQUEST_TOP_PROPERTY_VALUES
    }
}

export function receiveTopPropertyValues(event, property, topValues) {
    return {
        type: types.RECEIVE_TOP_PROPERTY_VALUES,
        event: event,
        property: property,
        values: topValues
    }
}

export function topPropertiesLoadFailure(err) {
    return {
        type: types.TOP_PROPERTY_VALUES_LOAD_FAILURE,
        err: err
    }
}

export function fetchTopPropertyValues(event, property) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function(dispatch) {
        dispatch(requestTopPropertyValues());
        return window.MP.api.propertyValues(event, property)
            .then(response => response.json)
            .then(topValues => topValues.map(function(val) { return {label: val, value: val}}))
            .then(topValues => dispatch(receiveTopPropertyValues(event, property, topValues)))
            .fail(err => dispatch(topPropertiesLoadFailure(err)));
    };
}
