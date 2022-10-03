import React from 'react';
import styles from './App.module.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default App;
