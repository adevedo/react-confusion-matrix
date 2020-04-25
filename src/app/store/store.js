import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReduce from './todosSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		todos: todosReduce,
	},
});
