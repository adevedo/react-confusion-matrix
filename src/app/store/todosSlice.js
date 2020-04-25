import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            { id: 1, title: 'Todo #1' },
            { id: 2, title: 'Todo #2' },
            { id: 3, title: 'Todo #3' },
            { id: 4, title: 'Todo #4' },
        ],
        todoAddProgress: false
    },
    reducers: {
        saveTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            let newTodos = state.todos.filter(v => v.id !== action.payload);
            state.todos = newTodos;
        },
        setTodoAddProgress: (state, action) => {
            state.todoAddProgress = action.payload;
        }
    },
});

export const addTodo = todo => dispatch => {
    setTimeout(() => {
        dispatch(todosSlice.actions.saveTodo(todo));
        dispatch(todosSlice.actions.setTodoAddProgress(false));
    }, 2000);
};

export const removeTodo = id => dispatch => {
    setTimeout(() => {
        dispatch(todosSlice.actions.removeTodo(id));
        dispatch(todosSlice.actions.setTodoAddProgress(false));
    }, 2000);
};


export const selectTodos = state => state.todos.todos;
export const selectTodo = (state, id) => state.todos.todos.filter(t => t.id == id)[0];
export const selectTodoAddProgress = state => state.todos.todoAddProgress;

export const { setTodoAddProgress } = todosSlice.actions;
export default todosSlice.reducer;