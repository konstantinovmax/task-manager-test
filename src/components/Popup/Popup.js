import React, { useEffect, useState } from 'react';
import styles from './Popup.module.scss';
import classNames from 'classnames';
import closeIcon from '../../res/icons/close_icon.svg';

const Popup = ({
  isOpen,
  onClose,
  onClickLayoutClosePopup,
  onAddItem,
  title,
  placeholder,
  buttonText,
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
          <img src={closeIcon} className={closeIcon} />
        </button>
        <h2 className={styles.title}>{title}</h2>
        <input
          type="text"
          value={inputValue}
          onChange={onInputValueChange}
          className={styles.input}
          placeholder={placeholder}
          minLength={2}
          maxLength={100}
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
