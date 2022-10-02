import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Popup from '../Popup/Popup';

import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Main />
      </div>
    </div>
  );
};

export default App;
