import * as types from '../constants/ActionTypes';

export function topEventsLoaded(events) {
    return {
        type: types.TOP_EVENTS_LOADED,
        events: events
    }
}

export function selectEvent(event) {
    return {
        type: types.SELECT_EVENT,
        event: event
    }
}

export function selectProperty(idx, property) {
    return {
        type: types.SELECT_PROPERTY,
        idx: idx,
        property: property
    }
}

export function selectOp(idx, op) {
    return {
        type: types.SELECT_OP,
        idx: idx,
        op: op
    }
}

export function selectPropValue(idx, value) {
    return {
        type: types.SELECT_PROP_VALUE,
        idx: idx,
        value: value
    }
}

export function addFilter(idx = null) {
    return {
        type: types.ADD_FILTER,
        idx: idx
    }
}

export function removeFilter(idx) {
    return {
        type: types.REMOVE_FILTER,
        idx: idx
    }
}

export function toggleFilterOp() {
    return {
        type: types.TOGGLE_FILTER_OP
    }
}

export function segmentToFilter(idx) {
    return {
        type: types.SEGMENT_TO_FILTER,
        idx: idx
    }
}

export function filterToSegment(idx) {
    return {
        type: types.FILTER_TO_SEGMENT,
        idx: idx
    }
}