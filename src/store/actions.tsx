import { Task, FilterParams } from "../types";

export const addItem = (payload: Task) => {
  return {
    type: "ADD_TASK",
    payload
  };
};

export const editItem = (payload: Task) => {
  return {
    type: "EDIT_TASK",
    payload
  };
};

export const deleteItem = (payload: number) => {
  return {
    type: "DELETE_TASK",
    payload
  };
};

export const setFilter = (payload: FilterParams) => {
  return {
    type: "SET_FILTER",
    payload
  };
};

export const setPage = (payload: number) => {
  return {
    type: "SET_PAGE",
    payload
  };
};

export const toggleComplete = (payload: number) => {
  return {
    type: "TOGGLE_COMPLETED",
    payload
  };
};

export const addVisibleTasks = (payload: Task[]) => {
  return {
    type: "LOAD_TASKS",
    payload
  };
};
