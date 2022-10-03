import React, { useEffect, useState } from 'react';
import styles from './Columns.module.scss';
import Column from '../Column/Column';
import Popup from '../Popup/Popup';
import classNames from 'classnames';

const Columns = () => {
  const initialState = [
    {
      id: 1,
      title: 'Backlog',
      tasks: [
        { id: 1, title: 'Реализовать авторизацию пользователя' },
        { id: 2, title: 'Обновить зависимости' },
      ],
    },
    {
      id: 2,
      title: 'In progress',
      tasks: [{ id: 1, title: 'Сверстать главный экран' }],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [],
    },
  ];

  const [columns, setColumns] = useState(initialState);
  const [isAddColumnPopupOpen, setIsAddColumnPopupOpen] = useState(false);
  const [isAddColumnButtonDisabled, setIsAddColumnButtonDisabled] =
    useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (columns.length >= 5) {
      setIsAddColumnButtonDisabled(true);
    } else {
      setIsAddColumnButtonDisabled(false);
    }
  }, [columns]);

  const onOpenAddColumnPopup = () => {
    setIsAddColumnPopupOpen(true);
  };

  const onCloseAddColumnPopup = () => {
    setIsAddColumnPopupOpen(false);
  };

  const onClickLayout = (e) => {
    if (e.target === e.currentTarget) {
      onCloseAddColumnPopup();
    }
  };

  const onAddColumn = (inputValue) => {
    const lastColumn = columns[columns.length - 1];

    const newColumn = {
      id: columns.length === 0 ? 1 : lastColumn.id + 1,
      title: inputValue,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const onDeleteColumn = (column) => {
    const updatedColumns = columns.filter((col) => col.id !== column.id);
    setColumns(updatedColumns);
  };

  const addTaskHandler = (inputValue, column) => {
    const lastTask = column.tasks[column.tasks.length - 1];

    const newTask = {
      id: lastTask + 1,
      title: inputValue,
    };

    setColumns(
      columns.map((col) => {
        if (col.id === column.id) {
          col.tasks.push(newTask);
        }

        return col;
      })
    );
  };

  const deleteTaskHandler = (task, column) => {
    setColumns(
      columns.map((col) => {
        const taskIndex = col.tasks.indexOf(task);
        if (col.id === column.id) {
          col.tasks.splice(taskIndex, 1);
        }

        return col;
      })
    );
  };

  const onDragStart = (column, task) => {
    setCurrentColumn(column);
    setCurrentTask(task);
    setIsDragging(true);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, column) => {
    e.preventDefault();
    setIsDragging(false);
    const currentIndex = currentColumn.tasks.indexOf(currentTask);
    currentColumn.tasks.splice(currentIndex, 1);
    column.tasks.push(currentTask);
    setColumns(
      columns.map((c) => {
        if (c.id === column.id) {
          return column;
        }
        if (c.id === currentColumn.id) {
          return currentColumn;
        }
        return c;
      })
    );
  };

  return (
    <div className={styles.root} onClick={(e) => onClickLayout(e)}>
      <div className={styles.head}>
        <p className={styles.title}>Процессы проекта</p>
        <button
          className={classNames(
            styles.addButton,
            isAddColumnButtonDisabled
              ? styles.addButtonDisabled
              : styles.addButton
          )}
          onClick={onOpenAddColumnPopup}
          disabled={isAddColumnButtonDisabled}
        >
          {isAddColumnButtonDisabled
            ? 'Максимум 5 колонок'
            : 'ДОБАВИТЬ КОЛОНКУ'}
        </button>
      </div>
      <div className={styles.columnsContainer}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onDeleteColumn={onDeleteColumn}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            addTaskHandler={addTaskHandler}
            deleteTaskHandler={deleteTaskHandler}
            isDragging={isDragging}
          />
        ))}
      </div>
      <Popup
        isOpen={isAddColumnPopupOpen}
        onClose={onCloseAddColumnPopup}
        onClickLayoutClosePopup={onClickLayout}
        onAddItem={onAddColumn}
        title="Укажите название колонки"
        placeholder="Название колонки"
        buttonText="Добавить колонку"
        minLength={2}
        maxLength={15}
      />
    </div>
  );
};

export default Columns;
