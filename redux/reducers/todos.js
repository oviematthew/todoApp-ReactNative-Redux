import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../actionTypes";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task, status } = action.payload;
      return {
        ...state,
        todo_list: [...state.todo_list, { id, task, status }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id !== id)
      };
    }
    case EDIT_TODO: {
      const { id, task, status } = action.payload;
      return {
        ...state,
        todo_list: state.todo_list.map((todo) =>
          todo.id === id ? { ...todo, task, status } : todo
        )
      };
    }
    default:
      return state;
  }
}