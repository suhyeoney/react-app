import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todoModule';

function Todo() {

    const { inputTitle, todoList } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const onSubmit = useCallback(e => {
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