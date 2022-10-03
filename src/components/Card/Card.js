import React from 'react';
import styles from './Card.module.scss';
import deleteIcon from '../../res/icons/delete_icon.svg';
import userImage from '../../res/images/user_image.png';
import classNames from 'classnames';

const Card = ({
  column,
  task,
  onDeleteTask,
  onDragStart,
  onDragOver,
  isDragging,
}) => {
  return (
    <div
      className={classNames(
        styles.root,
        isDragging ? styles.dragging : styles.root
      )}
      draggable
      onDragStart={() => onDragStart(column, task)}
      onDragOver={(e) => onDragOver(e)}
    >
      <div className={styles.firstSection}>
        <img
          className={styles.userImage}
          src={userImage}
          alt="Аватар пользователя"
        />
      </div>
      <div className={styles.secondSection}>
        <div className={styles.headContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>{task.title}</p>
          </div>
          <button
            className={styles.deleteButton}
            onClick={() => onDeleteTask(task)}
          >
            <img
              className={styles.deleteIcon}
              src={deleteIcon}
              alt="Кнопка удаления задачи"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
