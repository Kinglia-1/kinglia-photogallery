/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import SVG from 'react-inlinesvg';
import GalleryDetailGridItem from './GalleryDetailGridItem.jsx';
import Prev from './airbnb-prev-detail.svg';
import styles from '../styles/GalleryDetailGrid.css';

class GalleryDetailGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPrevClick = this.onPrevClick.bind(this);
  }

  onPrevClick() {
    const { onExitDetail } = this.props;
    onExitDetail();
  }

  render() {
    const { photos, getClickedPhotoIdxfromGrid } = this.props;
    return (
      <div className={styles.galleryDetailGridOutterContainer}>
        <div>
          <button className={styles.gallerydetailgridBackBtn} type="submit" onClick={this.onPrevClick}><SVG src={Prev} /></button>
        </div>
        <div className={styles.gallerydetailgridContainer}>
          {photos.map((item, index) => <GalleryDetailGridItem photo={item} key={index} photoIdx={index} getClickedPhotoIdxfromGrid={getClickedPhotoIdxfromGrid} />)}
        </div>
      </div>
    );
  }
}

export default GalleryDetailGrid;
