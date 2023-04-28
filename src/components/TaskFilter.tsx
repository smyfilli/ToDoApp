import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/actions";
import { FilterParams } from "../types";
import "../styles.css";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<FilterParams["title"]>("");
  const [startDateFilter, setStartDateFilter] = useState<any>();
  const [endDateFilter, setEndDateFilter] = useState<any>();
  const [completedFilter, setCompletedFilter] = useState<any>();

  console.log(completedFilter);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setFilter({
        title: titleFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
        completed: completedFilter
      })
    );
  };

  return (
    <header className="app-header">
      <h1>Привет, User</h1>
      <form className="filter-form" onSubmit={handleFilterSubmit}>
        <div className="filter-header">
          <span
            className="filter-header-btn"
            onClick={() => setShowFilter((prev) => !prev)}
          ></span>
          <input
            className="filter-tittle-input"
            type="text"
            placeholder=""
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
        <div>
          {showFilter && (
            <>
              <div className="filter-props">
                <div className="filter-props-item">
                  <label htmlFor="startDate">Начало</label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                </div>
                <div className="filter-props-item">
                  <label htmlFor="endDate">Конец</label>
                  <input
                    id="endDate"
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </div>
                <div className="filter-props-item">
                  <label>Процесс</label>
                  <select
                    id="completedFilter"
                    value={completedFilter}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      e.target.value !== ""
                        ? setCompletedFilter(Boolean(e.target.value))
                        : setCompletedFilter(e.preventDefault());
                    }}
                  >
                    <option value="">Все</option>
                    <option value="true">Завершена</option>
                    {/* <option value="false">Активна</option> */}
                  </select>
                </div>
              </div>
              <div className="filter-apply">
                <button className="btn-filter-apply" type="submit">
                  Применить
                </button>{" "}
              </div>
            </>
          )}
        </div>
      </form>
    </header>
  );
};

export default TaskFilter;
