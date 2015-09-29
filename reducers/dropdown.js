import { SELECT_ITEM, SET_BTN_COORDINATES } from '../constants/ActionTypes';

const initialState = [{}];

export default function dropdown(state = initialState, action) {
    switch (action.type) {
        case SELECT_ITEM:
            return Object.assign({}, state, {selected: action.item});
        case SET_BTN_COORDINATES:
            var b = state.btnMeasurements || {};
            if (b.height != action.height
                || b.width != action.width
                || b.top != action.top
                || b.left != action.left) {
                return Object.assign({}, state, {
                    btnMeasurements: {
                        height: action.height,
                        width: action.width,
                        top: action.top,
                        left: action.left
                    }
                });
            } else {
                return state;
            }

        default:
            return state;
    }
}
