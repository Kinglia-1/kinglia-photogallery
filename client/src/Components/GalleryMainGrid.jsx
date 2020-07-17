
import React from 'react';
import styles from '../styles/GalleryMainGrid.css';

class GalleryMainGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.imageClickHandler = this.imageClickHandler.bind(this);
  }

  imageClickHandler() {
    this.props.showDetailGrid();
  }

  render() {
    const { photos, numPhotos } = this.props;
    return (
      <div className={styles.galleryMainGridContainer}>
        <img className={styles.galleryMainGridImage} onClick={this.imageClickHandler} src={photos[0].photoUrl} />
        <div className={styles.gridInfoBackground}></div>
        <span className={styles.galleryMainGridInfo}>
          1 / {numPhotos}
        </span>
      </div>
    );
  }
}

export default GalleryMainGrid;
