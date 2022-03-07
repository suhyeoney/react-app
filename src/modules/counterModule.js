import {createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
    number: 0
};

const INCREASE = 'counter/INCREASE';
const DECREASE ='counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const counter = handleActions(
    {
        [INCREASE]: (state, action) =>
        produce(state, draft => {
            draft.number = draft.number + 1;
        }),
        [DECREASE]: (state, action) =>
        produce(state, draft => {
            draft.number = draft.number - 1;
        })        
    }, 
    initialState
);

export default counter;