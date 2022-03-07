import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todoModule';

function Todo() {

    /*
    Redux 동작 과정 : 
    i) store
    # 프로젝트 내 모든 state(상태)들을 관리
    # 규모가 큰 경우, state를 카테고리별로 분류하기도 함
    # 리액트 컴포넌트와 같은 하위개념이 store에 직접 접근할 수 없음 > action을 통해 접근해야 함
    # store에 대해 어떠한 행위를 하고 싶으면 action을 발행
    # store의 문지기(reducer)가 action의 발생을 감지하면 state가 update됨
    
    ii) action
    # 기본 포맷
    {
        type: [action의 종류를 한번에 식별할 수 있는 문자열 또는 symbol],
        payload: [action 실행에 필요한 임의의 데이터]
    }
    # action 오브젝트 생성의 번거로움을 없애기 위해, export를 통한 상수와 함수 일체 준비
    export const ADD_VALUE = '[식별 문자열]';
    export const addValue = amount => ({ type: ADD_VALUE, payload: amount });
    
    iii) reducer
    # store의 문지기 담당
    # previous state와 action을 합쳐 새로운 state를 생성하는 개념
    # initial state는 reducer의 디폴트 인수에서 정의됨
    # [중요!!!] state가 변할 때, state는 그 자체의 값으로 대체되는 것이 아니라 새로운 것이 합성되는 것처럼 사용됨
    */

    const { inputTitle, todoList } = useSelector(state => state.todo); // state hook 사용으로 inputTitle과 todoList의 상태를 조회 및 관리
    const dispatch = useDispatch();

    const onSubmit = useCallback(e => { // form의 submit 이벤트 호출 > dispatch 를 통해 action 을 발생시킴
        e.preventDefault();
        dispatch(insert(inputTitle));
        dispatch(changeInput(''));
    }, [dispatch, inputTitle]);

    const onChange = useCallback(e => {
        dispatch(changeInput(e.target.value));
    }, [dispatch]);

    const onToggle = useCallback(id => {
        dispatch(toggle(id));
    }, [dispatch]);

    const onRemove = useCallback(id => {
        dispatch(toggle(id));
    }, [dispatch]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={inputTitle} onChange={onChange} />
                <button type="submit">Add</button>
            </form>
            <div>
                {
                    todoList.map((item, index) => (
                        <div key={index}>
                            <input type="checkbox" checked={item.checked} readOnly={true} onClick={() => onToggle(item.id)} />
                            <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                                {item.title}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Todo;