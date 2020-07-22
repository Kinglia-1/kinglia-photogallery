import React from 'react';
import SVG from 'react-inlinesvg';
import LikeIcon from './airbnb-save-heart.svg';
import UnLikeIcon from './airbnb-unsave-heart.svg';
import styles from '../styles/SavePopupListItem.css';

class SavePopupListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.likeIconHandler = this.likeIconHandler.bind(this);
    this.unLikeIconHandler = this.unLikeIconHandler.bind(this);
  }

  likeIconHandler() {
    const { item } = this.props;
    const { likeStatusUpdate } = this.props;
    likeStatusUpdate(item._id, item.listName, false);
  }

  unLikeIconHandler() {
    const { item } = this.props;
    const { likeStatusUpdate } = this.props;
    likeStatusUpdate(item._id, item.listName, true);
  }

  render() {
    const { item } = this.props;
    let like;
    if (item.saved) {
      like = <SVG src={LikeIcon} className={styles.likeIcon} onClick={this.likeIconHandler} />;
    } else {
      like = <SVG src={UnLikeIcon} className={styles.likeIcon} onClick={this.unLikeIconHandler} />;
    }

    return (
      <tr className={styles.shareRow}>
        <td className={styles.shareTd}>
          <span className={styles.saveListName}>{item.listName}</span>
          {like}
        </td>
      </tr>
    );
  }
}

export default SavePopupListItem;
