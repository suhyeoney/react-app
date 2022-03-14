import {createAction, handleActions } from 'redux-actions';
import produce from 'immer';


const tableItem = {
    id: '',
    tag: '',
    checked: false
};

const initialState = {
    inputTag: '',
    itemTableList: [],
};

let id = 0;

const CHANGE_INPUT = 'itemTable/CHANGE_INPUT';
const INSERT = 'itemTable/INSERT';
const TOGGLE = 'itemTable/TOGGLE';
const REMOVE = 'itemTable/REMOVE';
const UPDATE_TAG = 'itemTable/UPDATE_TAG';

export const changeInput = createAction(CHANGE_INPUT, inputTag => inputTag);
export const insert = createAction(INSERT, tag => tag);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
export const updateTag = createAction(UPDATE_TAG, inputTag => inputTag);

const itemTable = handleActions(
    {
        [CHANGE_INPUT]: (state, {payload: inputTag}) =>
            produce(state, action => {
                action.inputTag = inputTag;
            }),
        [INSERT]: (state, {payload: tag}) =>
            produce(state, action => {
                const insertItem = {...tableItem};
                insertItem.id = ++id;
                insertItem.tag = tag;
                action.itemTableList.push(insertItem);
            }),
        [TOGGLE]: (state, {payload: id}) =>
            produce(state, action =>{
                const toggleItem = action.itemTableList.find(element => element.id === id);
                toggleItem.checked = !toggleItem.checked;
            }),
        [REMOVE]: (state, {payload: list}) =>
            produce(state, action => {
                list.forEach(element => {
                    if(element.checked) {
                        const checkedItemIndex = action.itemTableList.findIndex(subElement => subElement.id === element.id);
                        action.itemTableList.splice(checkedItemIndex, 1);
                    }
                });
            }),
        [UPDATE_TAG]: (state, {payload: inputTag}) =>
            produce(state, action => {
                action.inputTag = inputTag;
            })
    }, initialState
);

export default itemTable;