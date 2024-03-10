import { ADD_TODO, DELETE_TODO, EDIT_TODO, CLEAR_TODO } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = ({ task, status }) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task,
    status
  }
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});

export const editTodo = (id, task, status) => ({
  type: EDIT_TODO,
  payload: { id, task, status },
});


