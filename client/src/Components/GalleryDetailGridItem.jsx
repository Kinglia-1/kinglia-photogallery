/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from '../styles/GalleryDetailGridItem.css';

class GalleryDetailGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.imageClickHandler = this.imageClickHandler.bind(this);
  }

  imageClickHandler() {
    const { getClickedPhotoIdxfromGrid, photoIdx } = this.props;
    getClickedPhotoIdxfromGrid(photoIdx);
  }

  render() {
    const { photo } = this.props;
    return (
      <div className={styles.gallerydetailgridSubContainer}>
        <div className={styles.gallerydetailgridItem}>
          <div className={styles.gallerydetailgridImage}>
            <img onClick={this.imageClickHandler} src={photo.photoUrl} />
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryDetailGridItem;
