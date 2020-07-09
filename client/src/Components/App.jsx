/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import GalleryMain from './GalleryMain.jsx';
import GalleryDetail from './GalleryDetail.jsx';
import SharePopupInner from './SharePopupInner.jsx';
import GalleryDetailGrid from './GalleryDetailGrid.jsx';
import GalleryMainGrid from './GalleryMainGrid.jsx';
import styles from '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      view: 'main',
      showSharePopup: false,
      clickedPhotoIdx: -1,
      detailView: 'non-grid',
      mainView: 'main',
    };

    this.renderView = this.renderView.bind(this);
    this.onShowAll = this.onShowAll.bind(this);
    this.onExitDetail = this.onExitDetail.bind(this);
    this.saveToList = this.saveToList.bind(this);
    this.sharePopupHandler = this.sharePopupHandler.bind(this);
    this.backToGalleryDetail = this.backToGalleryDetail.bind(this);
    this.onClickDetailHandler = this.onClickDetailHandler.bind(this);
    this.getClickedPhotoIdx = this.getClickedPhotoIdx.bind(this);
    this.getClickedPhotoIdxfromGrid = this.getClickedPhotoIdxfromGrid.bind(this);
    this.changeViewOnWindowSize = this.changeViewOnWindowSize.bind(this);
    this.changeMainViewOnWindowSize = this.changeMainViewOnWindowSize.bind(this);
    this.showDetailGrid = this.showDetailGrid.bind(this);
    this.likeStatusUpdate = this.likeStatusUpdate.bind(this);
    this.getRoomPhotos = this.getRoomPhotos.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.changeViewOnWindowSize);
    window.addEventListener('resize', this.changeMainViewOnWindowSize);
    // const id = window.location.pathname.split('/')[2];
    this.getRoomPhotos(51);
  }



  onShowAll() {
    this.setState({ view: 'showAll' });
  }

  onExitDetail() {
    this.setState({
      view: 'main',
      detailView: 'non-grid',
      clickedPhotoIdx: -1,
    });
  }

  onClickDetailHandler() {
    this.setState({
      showSharePopup: false,
    });
  }

  getRoomPhotos(id) {
    $.ajax({
      method: 'GET',
      url: `/api/${id}/photogallery`,
      success: (data) => {
        this.setState({ photos: data });
      },
      error: (err) => {
        console.log('err on ajax get: ', err);
      },
    });
  }

  getClickedPhotoIdx(index) {
    this.setState({ clickedPhotoIdx: index, view: 'showAll' });
  }

  getClickedPhotoIdxfromGrid(index) {
    this.setState({ clickedPhotoIdx: index, view: 'showAll' });
  }

  changeViewOnWindowSize() {
    const { view } = this.state;
    if (view === 'showAll') {
      if (window.innerWidth > 900) {
        this.setState({ detailView: 'non-grid', clickedPhotoIdx: -1 });
      } else {
        this.setState({ detailView: 'grid', showSharePopup: false, clickedPhotoIdx: -1 });
      }
    }
  }

  changeMainViewOnWindowSize() {
    const { view } = this.state;
    if (view === 'main') {
      if (window.innerWidth > 750) {
        this.setState({ mainView: 'main', clickedPhotoIdx: -1 });
      } else {
        this.setState({ mainView: 'main-grid', clickedPhotoIdx: -1 });
      }
    }
  }

  showDetailGrid() {
    this.setState({ view: 'showAll', detailView: 'grid' });
  }

  backToGalleryDetail() {
    this.setState({
      showSharePopup: false,
      view: 'showAll',
    });
  }

  sharePopupHandler() {
    const { showSharePopup } = this.state;
    this.setState({
      showSharePopup: !showSharePopup,
    });
  }

  saveToList(listname, save) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3004/api/51/photogallery',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        name: listname,
        saved: save,
      }),
      success: () => {
        console.log('successfully save to a list ajax');
        $.ajax({
          method: 'GET',
          url: 'http://localhost:3004/api/51/photogallery',
          success: (data) => {
            this.setState({ photos: data });
          },
          error: (err) => {
            console.log('err on ajax get: ', err);
          },
        });
      },
      error: (err) => {
        console.log('err on ajax save to list post: ', err);
      },
    });
  }

  likeStatusUpdate(listId, listname, likedStatus) {
    $.ajax({
      method: 'PUT',
      url: 'http://localhost:3004/api/51/photogallery',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        id: listId,
        name: listname,
        saved: likedStatus,
      }),
      success: () => {
        console.log('successfully updated save list ajax');
        $.ajax({
          method: 'GET',
          url: 'http://localhost:3004/api/51/photogallery',
          success: (data) => {
            this.setState({ photos: data });
          },
          error: (err) => {
            console.log('err on ajax get: ', err);
          },
        });
      },
      error: (err) => {
        console.log('err on ajax update save list: ', err);
      },
    });
  }

  renderView() {
    const {
      photos, view, clickedPhotoIdx, detailView, mainView,
    } = this.state;
    const mainPhoto = [];
    const list = photos;

    if (list.length !== 0) {
      for (let i = 0; i < 5; i += 1) {
        mainPhoto.push(list[0].room_photos[i]);
      }
      if (clickedPhotoIdx >= 0) {
        return <GalleryDetail photos={photos[0]} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} clickedPhotoIdx={clickedPhotoIdx} saveToList={this.saveToList} likeStatusUpdate={this.likeStatusUpdate} />;
      } if (view === 'main') {
        if (mainView === 'main') {
          return <GalleryMain photos={photos[0]} onShowAll={this.onShowAll} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} getClickedPhotoIdx={this.getClickedPhotoIdx} />;
        } else {
          return <GalleryMainGrid photos={photos[0]} showDetailGrid={this.showDetailGrid} numPhotos={photos[0].room_photos.length} />;
        }
      } if (view === 'showAll') {
        if (detailView === 'grid') {
          return <GalleryDetailGrid photos={photos[0]} onExitDetail={this.onExitDetail} getClickedPhotoIdxfromGrid={this.getClickedPhotoIdxfromGrid} />;
        } else if (detailView === 'non-grid') {
          return <GalleryDetail photos={photos[0]} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} saveToList={this.saveToList} likeStatusUpdate={this.likeStatusUpdate} />;
        }
      }
    }
    return null;
  }

  render() {
    const { showSharePopup, detailView, view } = this.state;
    const sharePopupBackground = showSharePopup ? styles.showShareBackground : styles.noShareBackground;
    let appContainer = null;
    if (detailView === 'grid') {
      appContainer = `${styles.appContainer} ${styles.expandContainerBody}`;
    } else if (view === 'main') {
      appContainer = `${styles.appContainer}`;
    }

    return (
      <div className={appContainer}>
        {this.renderView()}
        <div className={sharePopupBackground} onClick={this.onClickDetailHandler}></div>
        {showSharePopup ? <SharePopupInner backToGalleryDetail={this.backToGalleryDetail} /> : null}
      </div>
    );
  }
}

export default App;
