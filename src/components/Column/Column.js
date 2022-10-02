import React, { useEffect, useRef, useState } from 'react';
import styles from './Column.module.scss';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';
import pencilIcon from '../../res/icons/pencil_icon.svg';
import deleteIcon from '../../res/icons/delete_icon.svg';
import plusIcon from '../../res/icons/plus_icon.svg';

const Column = ({
  column,
  onDeleteColumn,
  isColumnTitleInputDisabled,
  onDragStart,
  onDragOver,
  onDrop,
  addTaskHandler,
  deleteTaskHandler,
}) => {
  const [tasks, setTasks] = useState(column.tasks);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(
    isColumnTitleInputDisabled
  );

  useEffect(() => {
    if (!isInputDisabled) {
      columnTitleInput.current.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    setTasks(column.tasks);
  }, [column.tasks]);

  const columnTitleInput = useRef(null);

  const onClickEditButton = () => {
    setIsInputDisabled(false);
  };

  const onInputValueChange = (e) => {
    setColumnTitle(e.target.value);
  };

  const onOpenAddTaskPopup = () => {
    setIsAddTaskPopupOpen(true);
  };

  const onCloseAddTaskPopup = () => {
    setIsAddTaskPopupOpen(false);
  };

  const onClickLayout = (e) => {
    if (e.target === e.currentTarget) {
      onCloseAddTaskPopup();
    }
  };

  const onAddTask = (inputValue) => {
    addTaskHandler(inputValue, column);
  };

  const onDeleteTask = (task) => {
    deleteTaskHandler(task, column);
  };

  return (
    <div
      className={styles.root}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, column)}
    >
      <div className={styles.dashboard}>
        <input
          name="column-title"
          id="column-title"
          ref={columnTitleInput}
          className={styles.inputTitle}
          value={columnTitle || ''}
          onChange={onInputValueChange}
          disabled={isInputDisabled}
          minLength={2}
          maxLength={20}
        />
        <div className={styles.iconsContainer}>
          <button className={styles.editButton} onClick={onClickEditButton}>
            <img
              className={styles.pencilIcon}
              src={pencilIcon}
              alt="Pencil icon"
            />
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => onDeleteColumn(column)}
          >
            <img
              className={styles.deleteIcon}
              src={deleteIcon}
              alt="Delete icon"
            />
          </button>
        </div>
      </div>
      {tasks.map((task, index) => (
        <Card
          key={index + 1}
          column={column}
          task={task}
          onDeleteTask={onDeleteTask}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        />
      ))}

      <button className={styles.addButton} onClick={() => onOpenAddTaskPopup()}>
        <img className={styles.plustIcon} src={plusIcon} alt="Plus icon" />
      </button>
      <Popup
        isOpen={isAddTaskPopupOpen}
        onClose={onCloseAddTaskPopup}
        onClickLayoutClosePopup={onClickLayout}
        onAddItem={onAddTask}
        title="Укажите название задачи"
        placeholder="Название задачи"
        buttonText="Добавить задачу"
      />
    </div>
  );
};

export default Column;
