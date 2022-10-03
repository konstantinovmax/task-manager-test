import React from 'react';
import styles from './Header.module.scss';
import userImage from '../../res/images/user_image.png';
import arrowIcon from '../../res/icons/arrow_icon.svg';

const Header = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Task Manager</h1>
      <div className={styles.userContainer}>
        <img
          className={styles.userImage}
          src={userImage}
          alt="Аватар пользователя"
        />
        <p className={styles.userName}>Назир</p>
        <img
          className={styles.arrowIcon}
          src={arrowIcon}
          alt="Картинка стрелки вниз"
        />
      </div>
    </div>
  );
};

export default Header;
