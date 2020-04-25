import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, setTodoAddProgress } from '../../store/todosSlice';
import { selectTodos, selectTodo, selectTodoAddProgress } from '../../store/todosSlice';

import classes from './Todos.module.css';


function Todo(props) {

    const todo = useSelector(state => selectTodo(state, props.id))
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(setTodoAddProgress(true));
        dispatch(removeTodo(todo.id));
    }

    return (
        <li key={todo.id} onClick={remove}>{todo.title}</li>
    )
}

function AddTodo() {

    const dispatch = useDispatch();
    const todoAddProgress = useSelector(selectTodoAddProgress);
    const [title, setTitle] = useState('');

    const titleChangeHandler = (title) => {
        setTitle(title);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (title !== '') {
            dispatch(setTodoAddProgress(true));
            dispatch(addTodo({ id: Math.random(), title: title }));
            setTitle('');
        }
    }

    return (
        <>
            <form onSubmit={formSubmit}>
                <input type="text" value={title} onChange={(event) => titleChangeHandler(event.target.value)} />
                <button>Submit</button>
            </form>
            {todoAddProgress && <p>Loading...</p>}
        </>
    )
}

export function Todos() {

    const todos = useSelector(selectTodos);

    const todosItems = todos.map(todo => <Todo key={todo.id} id={todo.id} />);

    return (
        <div className={classes.Todos}>
            <h1>Todos</h1>
            <ul>{todosItems}</ul>
            <AddTodo />
        </div>
    )
}