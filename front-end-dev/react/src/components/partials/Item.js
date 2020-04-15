/** @format */

import React from "react";
import { Link } from "react-router-dom";
class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLike = (e) => {
    e.preventDefault();

    this.props.onLiked(this.props.id, !this.props.liked);
  };

  handleClick = (e, link) => {
    e.preventDefault();

    if (link === "like" && this.props.isAuthenticated) {
      this.props.onLiked(this.props.id, !this.props.liked);
    } else {
      this.props.onLinkClicked(link);
    }
  };

  handleSearch = (e, tag) => {
    e.preventDefault();
    this.props.onSearch(tag);
  };
  render() {
    const {
      id,
      thumbnail,
      title,
      keyName,
      github,
      hashtag,
      views,
      likes,
      liked,
    } = this.props;

    let style = {};
    let hashtagList = undefined;

    if (hashtag !== undefined && hashtag !== null && hashtag !== "") {
      hashtagList = hashtag.split("/").map((p) => (
        <li className='item__hashtag' key={p}>
          <a onClick={(e) => this.handleSearch(e, p)}>#{p}</a>
        </li>
      ));
    }

    if (liked) {
      style = { color: "#e74c3c" };
    }

    return (
      <li className='item'>
        <Link to={`/detail/${id}/`}>
          <img className='item__thumbnail' src={thumbnail} />
        </Link>
        <div className='item__row'>
          <Link to={`/detail/${id}/`}>
            <span className='item__title'>{title}</span>
          </Link>

          <div className='item__column'>
            <ul className='item__interests'>
              <li>
                <i className='fas fa-eye'></i> {views}
              </li>
              <li>
                <i
                  className={liked ? "fas fa-heart" : "far fa-heart"}
                  style={style}
                ></i>
                {likes}
              </li>
            </ul>
            <ul className='item__hashtags'>{hashtagList}</ul>
          </div>
        </div>
        <ul className='item__links'>
          <li>
            <a
              className='item__link item__link--like'
              onClick={(e) => this.handleClick(e, "like")}
            >
              <i
                className={liked ? "fas fa-heart" : "far fa-heart"}
                style={style}
              ></i>
            </a>
          </li>
          <li>
            <a
              className='item__link item__link--github'
              onClick={(e) => this.handleClick(e, `https://${github}`)}
            >
              <i className='fab fa-github'></i>
            </a>
          </li>
          <li>
            <a
              className='item__link item__link--paper'
              onClick={(e) =>
                this.handleClick(
                  e,
                  `https://gradubucket.s3.ap-northeast-2.amazonaws.com/${keyName}`
                )
              }
            >
              <i className='far fa-file-alt'></i>
            </a>
          </li>
        </ul>
      </li>
    );
  }
}

export default Item;
