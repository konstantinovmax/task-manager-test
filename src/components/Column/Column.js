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
  onDragStart,
  onDragOver,
  onDrop,
  addTaskHandler,
  deleteTaskHandler,
  isDragging,
}) => {
  const [tasks, setTasks] = useState(column.tasks);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);

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

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      setIsInputDisabled(true);
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
      onClick={onClickLayout}
    >
      {!isInputDisabled ? (
        <div
          className={styles.layout}
          onClick={() => setIsInputDisabled(true)}
        ></div>
      ) : (
        <></>
      )}
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
          maxLength={15}
          onKeyDown={(e) => onClickEnter(e)}
        />
        <div className={styles.iconsContainer}>
          <button className={styles.editButton} onClick={onClickEditButton}>
            <img
              className={styles.pencilIcon}
              src={pencilIcon}
              alt="Кнопка редактирования названия колонки"
            />
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => onDeleteColumn(column)}
          >
            <img
              className={styles.deleteIcon}
              src={deleteIcon}
              alt="Кнопка удаления колонки"
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
          isDragging={isDragging}
        />
      ))}

      <button className={styles.addButton} onClick={() => onOpenAddTaskPopup()}>
        <img
          className={styles.plustIcon}
          src={plusIcon}
          alt="Кнопка вызова окна для добавления новой задачи"
        />
      </button>
      <Popup
        isOpen={isAddTaskPopupOpen}
        onClose={onCloseAddTaskPopup}
        onClickLayoutClosePopup={onClickLayout}
        onAddItem={onAddTask}
        title="Укажите название задачи"
        placeholder="Название задачи"
        buttonText="Добавить задачу"
        minLength={2}
        maxLength={80}
      />
    </div>
  );
};

export default Column;
