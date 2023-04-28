import React, { useState } from "react";
import { Task } from "../types";
import { useDispatch } from "react-redux";
import { addItem, editItem } from "../store/actions";

interface FormProps {
  onCancel: () => void;
  setActive: (arg0: boolean) => void;
  initialValues?: Task;
}

const Form: React.FC<FormProps> = ({ onCancel, setActive, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [startDate, setStartDate] = useState(initialValues?.startDate || "");
  const [endDate, setEndDate] = useState(initialValues?.endDate || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: initialValues?.id || Date.now(),
      title,
      completed: false,
      startDate,
      endDate,
      description
    };
    if (initialValues) {
      dispatch(editItem(task));
      setActive(false);
    } else {
      dispatch(addItem(task));
      {
        setActive(false);
      }
    }
  };

  return (
    <div className="modal-container">
      <h2 className="header-form">
        {initialValues ? "Редактирование" : "Новая задача"}
      </h2>
      <form className="form-modal" onSubmit={handleSubmit}>
        <div className="modal-content-main">
          <div className="modal-content">
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-content">
            <label htmlFor="startDate">Начало</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="modal-content">
            <label htmlFor="endDate">Конец</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="modal-content">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">
            {initialValues ? "Обновить" : "Добавить"}
          </button>
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
