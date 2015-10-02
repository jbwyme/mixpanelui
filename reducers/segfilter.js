import * as types from '../constants/SegfilterActionTypes';

export default function segfilter(state = {}, action = {}) {
    switch (action.type) {
        case types.SELECT_EVENT:
            return Object.assign({}, state, {selectedEvent: action.event, filters: [], segments: []});
        case types.SELECT_PROPERTY:
            state['filters'][action.idx].property = action.property;
            return Object.assign({}, state);
        case types.CAST_PROPERTY_TYPE:
            state['filters'][action.idx].property.type = action.propType;
            return Object.assign({}, state);
        case types.SELECT_OP:
            state['filters'][action.idx].op = action.op;
            return Object.assign({}, state);
        case types.SELECT_PROP_VALUE:
            state['filters'][action.idx].value = action.value;
            return Object.assign({}, state);
        case types.ADD_FILTER:
            if (state['filters'].length == 0) {
                state['filterOp'] = 'and'
            }
            let idx = action.idx === null ? state['filters'].length : action.idx;
            state['filters'].splice(idx + 1, 0, {});
            return Object.assign({}, state);
        case types.REMOVE_FILTER:
            state['filters'].splice(action.idx, 1);
            if (state['filters'].length == 0) {
                state['filters'].push({});
            }
            return Object.assign({}, state);
        case types.TOGGLE_FILTER_OP:
            state['filterOp'] = state['filterOp'] === 'and' ? 'or' : 'and';
            return Object.assign({}, state);
        case types.EXPAND_FILTER:
            state['filters'][action.idx].isFilter = true;
            return Object.assign({}, state);
        case types.COLLAPSE_FILTER:
            Object.assign(state['filters'][action.idx], {isFilter: false, op: null, value: null});
            return Object.assign({}, state);
        default:
            return state;
    }
}
