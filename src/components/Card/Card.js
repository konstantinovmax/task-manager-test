import React from 'react';
import styles from './Card.module.scss';
import deleteIcon from '../../res/icons/delete_icon.svg';

const Card = ({ column, task, onDeleteTask, onDragStart, onDragOver }) => {
  return (
    <div
      className={styles.root}
      draggable
      onDragStart={(e) => onDragStart(column, task)}
      onDragOver={(e) => onDragOver(e)}
    >
      <div className={styles.firstSection}></div>
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
              alt="Delete icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
