import React, { useState, useMemo } from "react";
import TaskListItem from "./TaskListItem";
import { Task, AppState } from "../types";
import Form from "../components/Form";
import { useSelector } from "react-redux";
//import { addVisibleTasks, setPage } from "../store/actions";

const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  const tasks = useSelector((state: AppState) => state.tasks);
  const filter = useSelector((state: AppState) => state.filter);
  //let page = useSelector((state: AppState) => state.pagination.page);
  // const TASKS_PER_PAGE = useSelector(
  //   (state: AppState) => state.pagination.pageSize
  // );
  // const startIndex = (page - 1) * TASKS_PER_PAGE;
  // const endIndex = startIndex + TASKS_PER_PAGE;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (
        filter.title &&
        !task.title.toLowerCase().includes(filter.title.toLowerCase())
      ) {
        return false;
      }
      if (filter.startDate && task.startDate < filter.startDate) {
        return false;
      }
      if (filter.endDate && task.endDate > filter.endDate) {
        return false;
      }
      if (
        filter.completed !== undefined &&
        task.completed !== filter.completed
      ) {
        return false;
      }
      return true;
    });
  }, [tasks, filter]);

  // const scrollHandler = (e: any) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     100
  //   ) {
  //     dispatch(setPage(page++));
  //     setFetching(true);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("scroll", scrollHandler);
  //   return () => {
  //     document.removeEventListener("scroll", scrollHandler);
  //   };
  // });

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditTask(undefined);
    setShowForm(false);
  };

  // const visibleTasks = filteredTasks
  //   .slice(startIndex, endIndex)
  //   .map((task) => (
  //     <TaskListItem key={task.id} task={task} setEditTask={handleEditTask} />
  //   ));

  return (
    <>
      <div className="task-list-header">
        <h2>Задачи</h2>
        <span className="btn-add-task" onClick={() => setShowForm(true)}></span>
      </div>

      <div className={showForm ? "modal active" : "modal"}>
        {showForm && (
          <Form
            initialValues={editTask}
            setActive={setShowForm}
            onCancel={handleCancelForm}
          />
        )}
      </div>
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              setEditTask={handleEditTask}
            />
          ))
        ) : (
          <div>No tasks found.</div>
        )}
      </div>
    </>
  );
};

export default TaskList;
