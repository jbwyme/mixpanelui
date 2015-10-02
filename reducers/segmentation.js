import * as types from '../constants/SegmentationActionTypes';

export default function segmentation(state = {}, action = {}) {
    switch (action.type) {
        case types.RECEIVE_TOP_EVENTS:
            return Object.assign({}, state, {topEvents: action.events});
        case types.RECEIVE_TOP_PROPERTIES:
            state.topProperties = state.topProperties || {};
            state.topProperties[action.event] = action.properties;
            return Object.assign({}, state);
        case types.RECEIVE_TOP_PROPERTY_VALUES:
            let topPropVals = state.topPropertyValues || {};
            topPropVals[action.property] = action.values;
            state.topPropertyValues = topPropVals;
            return Object.assign({}, state);
        default:
            return state;
    }
}
