import React from 'react';
import styles from './Main.module.scss';
import Columns from '../Columns/Columns';

const Main = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Проект</h2>
      <Columns />
    </div>
  );
};

export default Main;
