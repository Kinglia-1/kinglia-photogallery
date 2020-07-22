
import React from 'react';
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
    const id = window.location.pathname.split('/')[2];
    console.log(id)
    console.log('didmount')
    this.getRoomPhotos(id);
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

  getRoomPhotos(id) {
    const getPhotos = axios.get(`/api/rooms/${id}/photos`);
    const getSaveStatus = axios.get(`/api/rooms/${id}/save`);
    axios.all([getPhotos, getSaveStatus])
      .then(axios.spread((res1, res2) => {
        const photosArr = res1.data;
        const saveArr = res2.data;
        const data = {};
        data.roomPhotos = photosArr;
        data.save_status = saveArr;
        console.log('my photos before set state', data)
        this.setState({ photos: data });
      }))
      .catch((err) => {
        console.log(err);
      })
  }


  saveToList(listName, save) {
    const id = window.location.pathname.split('/')[2];
    axios.post(`/api/rooms/${id}/save`, { listName : listName, saved: save })
    .then((response) => {
      console.log(response.data)
      this.getRoomPhotos(id)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  likeStatusUpdate(listId, listname, likedStatus) {
    const id = window.location.pathname.split('/')[2];
    axios.put(`/api/rooms/${id}/save`, {_id: listId, saved: likedStatus})
      .then((res) => {
        console.log(res.data)
        this.getRoomPhotos(id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderView() {
    const {
      photos, view, clickedPhotoIdx, detailView, mainView,
    } = this.state;
    console.log('rendering', photos);
    if (photos.length !== 0) {
      if (clickedPhotoIdx >= 0) {
        return <GalleryDetail photos={photos} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} clickedPhotoIdx={clickedPhotoIdx} saveToList={this.saveToList} likeStatusUpdate={this.likeStatusUpdate} />;
      } if (view === 'main') {
        if (mainView === 'main') {
          return <GalleryMain photos={photos} onShowAll={this.onShowAll} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} getClickedPhotoIdx={this.getClickedPhotoIdx} />;
        }
        return <GalleryMainGrid photos={photos} showDetailGrid={this.showDetailGrid} numPhotos={photos.length} />;
      } if (view === 'showAll') {
        if (detailView === 'grid') {
          return <GalleryDetailGrid photos={photos} onExitDetail={this.onExitDetail} getClickedPhotoIdxfromGrid={this.getClickedPhotoIdxfromGrid} />;
        } if (detailView === 'non-grid') {
          return <GalleryDetail photos={photos} onExitDetail={this.onExitDetail} sharePopupHandler={this.sharePopupHandler} saveToList={this.saveToList} likeStatusUpdate={this.likeStatusUpdate} />;
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
        <div className={sharePopupBackground} onClick={this.onClickDetailHandler} />
        {showSharePopup ? <SharePopupInner backToGalleryDetail={this.backToGalleryDetail} /> : null}
      </div>
    );
  }
}

export default App;
