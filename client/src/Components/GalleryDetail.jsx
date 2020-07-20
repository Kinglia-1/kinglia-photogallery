import React from 'react';
import SVG from 'react-inlinesvg';
import SavePopup from './SavePopup.jsx';
import SavePopupList from './SavePopupList.jsx';
import Close from './airbnb-close.svg';
import Save from './airbnb-save.svg';
import Share from './airbnb-share.svg';
import Next from './airbnb-next.svg';
import Prev from './airbnb-prev.svg';
import styles from '../styles/GalleryDetail.css';

class GalleryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPhotoIdx: this.props.clickedPhotoIdx || 0,
      showSavePopup: false,
      fadeLoaded: false,
    };
    this.closeClickHandler = this.closeClickHandler.bind(this);
    this.nextClickHandler = this.nextClickHandler.bind(this);
    this.prevClickHandler = this.prevClickHandler.bind(this);
    this.shareClickHandler = this.shareClickHandler.bind(this);
    this.saveClickHandler = this.saveClickHandler.bind(this);
    this.backToGalleryDetail = this.backToGalleryDetail.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  shareClickHandler() {
    const { sharePopupHandler } = this.props;
    sharePopupHandler();
  }

  saveClickHandler() {
    const { showSavePopup } = this.state;
    this.setState({ showSavePopup: !showSavePopup });
  }

  closeClickHandler() {
    const { onExitDetail } = this.props;
    onExitDetail();
  }

  nextClickHandler() {
    const { currPhotoIdx, fadeLoaded } = this.state;
    this.setState({ currPhotoIdx: currPhotoIdx + 1, fadeLoaded: !fadeLoaded });
  }

  prevClickHandler() {
    const { currPhotoIdx, fadeLoaded } = this.state;
    this.setState({ currPhotoIdx: currPhotoIdx - 1, fadeLoaded: !fadeLoaded });
  }

  backToGalleryDetail() {
    this.setState({
      showSavePopup: false,
    });
  }

  render() {
    const { currPhotoIdx, showSavePopup, fadeLoaded } = this.state;
    const { photos, saveToList, likeStatusUpdate } = this.props;
    let prevBtn;
    let nextBtn;
    if (currPhotoIdx === 0) {
      prevBtn = null;
    } else {
      prevBtn = <button className={styles.prevBtn} type="submit" onClick={this.prevClickHandler}><SVG src={Prev} className="svg-prev" /></button>;
    }

    if (currPhotoIdx === photos.length - 1) {
      nextBtn = null;
    } else {
      nextBtn = <button className={styles.nextBtn} type="submit" onClick={this.nextClickHandler}><SVG src={Next} /></button>;
    }

    let popUp;
    if (showSavePopup) {
      if (photos.save_status.length > 0) {
        popUp = <SavePopupList closePopup={this.saveClickHandler} backToGalleryDetail={this.backToGalleryDetail} saveToList={saveToList} likeStatusUpdate={likeStatusUpdate} photos={photos} />;
      } else {
        popUp = <SavePopup closePopup={this.saveClickHandler} backToGalleryDetail={this.backToGalleryDetail} saveToList={saveToList} />;
      }
    } else {
      popUp = null;
    }

    const fadeClasses = fadeLoaded ? `${styles.detailImg} ${styles.loaded1}` : `${styles.detailImg} ${styles.loaded2}`;

    return (
      <div className={styles.galleryDetailContainer}>
        <div className={styles.detailTopRow}>
          <button className={styles.closeBtn} type="submit" onClick={this.closeClickHandler}>
            <SVG src={Close} />
            Close
          </button>
          <span className={styles.idxInfo}>
            {currPhotoIdx + 1}
            {' / '}
            {photos.length}
          </span>
          <button className={styles.saveListBtn} type="submit" onClick={this.saveClickHandler}><SVG src={Save} /></button>
          <button className={styles.shareBtn} type="submit" onClick={this.shareClickHandler}><SVG src={Share} /></button>
        </div>
        <div className={styles.detailBottomWrapper}>
          <div className={styles.prevBtnWrapper}>
            {prevBtn}
          </div>
          <img className={fadeClasses} src={photos[currPhotoIdx].photoUrl} />
          <div className={styles.nextBtnWrapper}>
            {nextBtn}
          </div>
        </div>
        <div className={styles.photoDescriptionContainer}>
          <span className={styles.photoDescription}>{photos[currPhotoIdx].photoDescription}</span>
        </div>
        {popUp}
      </div>
    );
  }
}

export default GalleryDetail;
