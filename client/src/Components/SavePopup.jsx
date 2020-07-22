
import React from 'react';
import SVG from 'react-inlinesvg';
import CloseForm from './airbnb-close-form.svg';
import styles from '../styles/SavePopup.css';

class SavePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      createValid: false,
    };
    this.onCloseHandler = this.onCloseHandler.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.onClickDetailHandler = this.onClickDetailHandler.bind(this);
    this.createListHandler = this.createListHandler.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  onCloseHandler() {
    const { closePopup } = this.props;
    closePopup();
  }

  onInputChangeHandler(e) {
    this.setState({ listName: e.target.value, createValid: true });

    if (e.target.value.length === 0) {
      this.setState({ createValid: false });
    }
  }

  onClickDetailHandler() {
    const { backToGalleryDetail } = this.props;
    backToGalleryDetail();
  }

  createListHandler() {
    const { listName } = this.state;
    const { saveToList } = this.props;
    saveToList(listName, true);
    this.setState({ listName: '' });
  }

  render() {
    const { createValid, listName } = this.state;
    const cursorClasses = createValid ? `${styles.saveToListCreateBtn} ${styles.allowedCursor}` : `${styles.saveToListCreateBtn} ${styles.notAllowedCursor}`;

    return (
      <div className={styles.savePopup}>
        <div className={styles.savePopupOutter} onClick={this.onClickDetailHandler}></div>
        <div className={styles.savePopupInner}>
          <div className={styles.closeFormBtnWrapper}>
            <button className={styles.closeFormBtn} type="submit" onClick={this.onCloseHandler}><SVG src={CloseForm} /></button>
          </div>
          <div className={styles.saveToListStl}>
            Save to a list
          </div>
          <div className={styles.saveToListName}>
            Name
          </div>
          <div className={styles.saveToListInputWrapper}>
            <input className={styles.saveToListInput} name="name" placeholder="Ex: Summer vacation" type="text" value={listName} onChange={this.onInputChangeHandler} />
          </div>
          <div className={styles.saveToListBtnWrapper}>
            <button className={cursorClasses} type="submit" onClick={this.createListHandler}>
              Create
            </button>
            <button className={styles.saveToListCancelBtn} type="submit" onClick={this.onCloseHandler}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SavePopup;
