import { AppState, AppAction } from "../types";

const initialState: AppState = {
  tasks: [],
  pagination: { page: 1, pageSize: 15, totalCount: 0 },
  filter: {}
};

function reducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        pagination: {
          ...state.pagination,
          totalCount: state.pagination.totalCount + 1
        }
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        pagination: {
          ...state.pagination,
          totalCount: state.pagination.totalCount - 1
        }
      };
    case "SET_FILTER":
      return {
        ...state,
        visibleTasks: [],
        filter: action.payload,
        pagination: { ...state.pagination, page: 1 }
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload }
      };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    // case "LOAD_TASKS":
    //   return {
    //     ...state,
    //     visibleTasks: [...state.visibleTasks, action.payload]
    //   };
    default:
      return state;
  }
}

export default reducer;
