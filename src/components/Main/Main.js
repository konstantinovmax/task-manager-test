import React, { useState } from 'react';
import Columns from '../Columns/Columns';
import styles from './Main.module.scss';

const PROJECT_STRING = 'Проект';

const Main = () => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{PROJECT_STRING}</p>
      <Columns />
    </div>
  );
};

export default Main;
