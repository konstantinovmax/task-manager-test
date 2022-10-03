import React, { useEffect, useState } from 'react';
import styles from './Popup.module.scss';
import closeIcon from '../../res/icons/close_icon.svg';
import classNames from 'classnames';

const Popup = ({
  isOpen,
  onClose,
  onClickLayoutClosePopup,
  onAddItem,
  title,
  placeholder,
  buttonText,
  minLength,
  maxLength,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (inputValue === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [inputValue]);

  const onSubmit = (e) => {
    e.preventDefault();

    onAddItem(inputValue);
    setInputValue('');
    onClose();
  };

  const onInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={classNames(styles.root, isOpen && styles.visible)}
      onClick={(e) => onClickLayoutClosePopup(e)}
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <button type="reset" className={styles.closeButton} onClick={onClose}>
          <img
            src={closeIcon}
            className={closeIcon}
            alt="Кнопка закрытия окна"
          />
        </button>
        <h2 className={styles.title}>{title}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={onInputValueChange}
          className={styles.input}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          autoFocus={true}
          required
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={classNames(
            styles.submitButton,
            isButtonDisabled ? styles.submitButtonDisabled : styles.submitButton
          )}
        >
          {buttonText.toUpperCase()}
        </button>
      </form>
    </div>
  );
};

export default Popup;
