import * as types from '../constants/SegfilterActionTypes';

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

export function castPropertyType(idx, propType) {
    return {
        type: types.CAST_PROPERTY_TYPE,
        idx: idx,
        propType: propType.value
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

export function expandFilter(idx) {
    return {
        type: types.EXPAND_FILTER,
        idx: idx
    }
}

export function collapseFilter(idx) {
    return {
        type: types.COLLAPSE_FILTER,
        idx: idx
    }
}