import { createAction, handleActions } from 'redux-actions';
import produce from 'immer'; // 객체의 불변성을 유지하는데 사용되는 라이브러리

const todoItem = {
    id: '',
    title: '',
    checked: false
};

const initialState = {
    inputTitle: '',
    todoList: []
};

let id = 0;

// action 정의 Start
const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

// createAction : action 생성 함수, 해당 action이 데이터를 필요로 하는 경우에는 두번째 파라미터로 데이터를 받도록 함. action 생성 함수가 action에 필요한 데이터를 전달받아 action.payload에 넣어줌
export const changeInput = createAction(CHANGE_INPUT, inputTitle => inputTitle);
export const insert = createAction(INSERT, title => title);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
// action 정의 End

// reducer 정의 Start
// handleActions : reducer를 simple하게 작성하기 위해 사용
// action에 추가로 넘겨준 데이터를 확인할 때, 높은 가독성 보장을 위해 payload를 새로운 변수명으로 설정 (구조분해할당)
const todo = handleActions(
    {
        [CHANGE_INPUT]: (state, {payload: inputTitle}) =>
            produce(state, draft => {
                draft.inputTitle = inputTitle;
            }),
        [INSERT]: (state, {payload: title}) =>
            produce(state, draft => {
                const insertItem = {...todoItem};
                insertItem.id = ++id;
                insertItem.title = title;
                draft.todoList.push(insertItem);
            }),
        [TOGGLE]: (state, {payload: id}) =>
            produce(state, draft => {
                const toggleItem = draft.todoList.find(item => item.id ===id);
                toggleItem.checked = !toggleItem.checked;
            }),
        [REMOVE]: (state, {payload: id}) =>
            produce(state, draft => {
                const removeIndex = draft.todoList.findIndex(item => item.id === id);
                draft.todoList.splice(removeIndex, 1);
            }),
    }, initialState
);
// reducer 정의 End

export default todo;