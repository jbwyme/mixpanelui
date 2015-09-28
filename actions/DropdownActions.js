import * as types from '../constants/ActionTypes';

export function selectItem(item) {
    return {
        type: types.SELECT_ITEM,
        item: item
    }
}

export function setBtnCoordinates($btn) {
    return {
        type: types.SET_BTN_COORDINATES,
        height: $btn.outerHeight(),
        width: $btn.outerWidth(),
        top: $btn.offset().top,
        left: $btn.offset().left
    }
}