export interface Task {
  id: number;
  title: string;
  completed: boolean;
  startDate: Date;
  endDate: Date;
  description?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
}

export type FilterParams = {
  title?: string;
  completed?: boolean;
  startDate?: Date;
  endDate?: Date;
};

export interface AppState {
  tasks: Task[];
  pagination: Pagination;
  filter: FilterParams;
}

export interface State {
  tasks: Task[];
}

export type AppAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "SET_FILTER"; payload: FilterParams }
  | { type: "SET_PAGE"; payload: number }
  | { type: "TOGGLE_COMPLETED"; payload: number };
