/** @format */

import React from "react";
import { Link } from "react-router-dom";
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, thumbnail, title, keyName, github, hashtag } = this.props;
    const views = 0;
    const likes = 0;
    const hashtagList = hashtag.split("/")

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
                <i className='fas fa-heart'></i> {likes}
              </li>
            </ul>
            <ul className='item__hashtags'>
              {paperList.map((p) => (
                <li className='item__hashtag'>
                  <Link to={`/detail/${p}/`}>{p}</Link>
                </li>
              ))}
              <li className='item__hashtag'>
                <Link to='/result/test'>#test</Link>
              </li>
              <li className='item__hashtag'>
                <Link to='/result/test'>#test</Link>
              </li>
              <li className='item__hashtag'>
                <Link to='/result/test'>#test</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='item--overay'>
          <div className='item__links'>
            <a
              className='item__link link--github'
              href={`https://${github}`}
              target='_blank'
            ></a>
            <a
              className='item__link link--paper'
              href={`https://gradubucket.s3.ap-northeast-2.amazonaws.com/${keyName}`}
              target='_blank'
            ></a>
          </div>
        </div>
      </li>
    );
  }
}

export default Item;
