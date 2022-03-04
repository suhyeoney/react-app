import * as types from './ActionTypes';

export function getTrainsPending() {
    return {
        type: types.GET_TRAINS_PENDING
    };
}

export function getTrainsSuccess() {
    return {
        type: types.GET_TRAINS_SUCCESS
    };
}

export function getTrainFailure() {
    return {
        type: types.GET_TRAINS_FAILURE
    };
}