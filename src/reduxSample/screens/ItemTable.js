import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ changeInput, insert, toggle, remove } from '../modules/itemTableModule';
import Table from 'react-bootstrap/Table';

function ItemTable() {

    const { inputTag, itemTableList } = useSelector(state => state.itemTable);
    const dispatch = useDispatch();

    const onSubmit = useCallback(e => {
        e.preventDefault();
        dispatch(insert(inputTag));
        dispatch(changeInput(''));
    }, [dispatch, inputTag]);

    const onChange = useCallback(e => {
        dispatch(changeInput(e.target.value));
    }, [dispatch]);

    const onToggle = useCallback(id => {
        dispatch(toggle(id));
    }, [dispatch]);

    const onRemove = useCallback(list => {
        dispatch(remove(list));
    }, [dispatch]);


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={inputTag} onChange={onChange} />
                <button type="submit">Add Item</button>
            </form>
            <Table striped bordered hover variant="dark" responsive="sm">
                <thead>
                    <tr>
                        <th>-</th>
                        <th>No.</th>
                        <th>Tag</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemTableList.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" checked={item.checked} readOnly={true} onClick={() => onToggle(item.id)} />
                                </td>
                                <td>{index + 1}</td>
                                <td>{item.tag}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <button onClick={() => onRemove(itemTableList)}>Remove All Selected</button>
        </div>
    );
};

export default ItemTable;