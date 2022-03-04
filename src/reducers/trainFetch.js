import * as types from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';

const initialState = {
    pending: false,
    error: false,
    trainList: []
};

function fetchTrainsApi() {
    return fetch('getAllTrainsInfo')
    .then(res => res.json())
    .then(json => json.data.trains)
    .catch(err => console.log(err))
}

export const trainFetch = () => dispatch => {

    console.log("trainFetch entered, dispatch start");
    dispatch({
        type: types.GET_TRAINS_PENDING
    });

    return fetchTrainsApi()
    .then(res => {
        console.log("getAPIresult : ", res);
        dispatch({
            type: types.GET_TRAINS_SUCCESS,
            payload: res
        })
    })
    .catch(err => {
        console.log("getAPIresult : ", err);
        dispatch({
            type: types.GET_TRAINS_FAILURE,
            payload: err
        })
    })
}

export default handleActions({
    [types.GET_TRAINS_PENDING]: (state, action) => {
        console.log("pending data : ");
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [types.GET_TRAINS_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending: false,
            trainList: [...action.payload]
        };
    },
    [types.GET_TRAINS_FAILURE]: (state, action) => {
        console.log("pending data : ");
        return {
            ...state,
            pending: false,
            error: true
        };
    }
}, initialState);