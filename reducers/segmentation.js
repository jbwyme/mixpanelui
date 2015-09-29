import * as types from '../constants/ActionTypes';

export default function segmentation(state = {}, action) {
    switch (action.type) {
        case types.TOP_EVENTS_LOADED:
            return Object.assign({}, state, {topEvents: action.events});
        case types.SELECT_EVENT:
            return Object.assign({}, state, {selectedEvent: action.event, filters: [], segments: []});
        case types.SELECT_PROPERTY:
            state['filters'][action.idx].selectedProperty = action.property;
            return Object.assign({}, state);
        case types.SELECT_OP:
            state['filters'][action.idx].selectedOp = action.op;
            return Object.assign({}, state);
        case types.SELECT_PROP_VALUE:
            state['filters'][action.idx].selectedValue = action.value;
            return Object.assign({}, state);
        case types.ADD_FILTER:
            state['filters'].push({});
            return Object.assign({}, state);
        case types.SEGMENT_TO_FILTER:
            state['filters'][action.idx].isFilter = true;
            return Object.assign({}, state);
        case types.FILTER_TO_SEGMENT:
            Object.assign(state['filters'][action.idx], {isFilter: false, selectedOp: null, selectedValue: null});
            return Object.assign({}, state);
        default:
            return state;
    }
}
