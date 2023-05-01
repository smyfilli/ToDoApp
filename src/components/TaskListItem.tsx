import { useDispatch } from "react-redux";
import { Task } from "../types";
import { toggleComplete, deleteItem } from "../store/actions";
import { useState } from "react";

interface TaskListItemProps {
  task: Task;
  setEditTask: (editTask: Task) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, setEditTask }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      dispatch(deleteItem(task.id));
    }
  };

  return (
    <div className="task-list-item">
      <div className="task-list-item-title">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompleted}
        />
        <div
          className="task-content"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <div>{task.title}</div>
          <div className="task-dates">
            <div className="task-dates-item">
              {task.startDate ? task.startDate : "гг-мм-дд"}
            </div>
            <div className="task-dates-item"> - </div>
            <div className="task-dates-item">
              {task.endDate ? task.endDate : "гг-мм-дд"}
            </div>
          </div>
          {showDescription && (
            <textarea id="description" value={task.description} />
          )}
        </div>
      </div>
      <div className="task-list-item-actions">
        <div className="btn-delete" onClick={handleDeleteTask}>
          {" "}
        </div>
        <div className="btn-edit" onClick={() => setEditTask(task)}>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
