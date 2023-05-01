import React, { useState, useMemo } from "react";
import TaskListItem from "./TaskListItem";
import { Task, AppState } from "../types";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  const tasks = useSelector((state: AppState) => state.tasks);
  const filter = useSelector((state: AppState) => state.filter);

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

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditTask(undefined);
    setShowForm(false);
  };

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
