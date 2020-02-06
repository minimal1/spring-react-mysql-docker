/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
class Item extends React.Component {
  render() {
    return (
      <div className='paper-item'>
        <Link to='/detail/1q2w3e4r' className='img-link'>
          <img className='paper-img' src='/imgs/icon-logo.JPEG' />
        </Link>

        <div className='paper-introduction'>
          <Link to='/detail/1q2w3e4r' className='paper-title'>
            Image-to-Image Translation with Conditional Adversarial Networks
          </Link>

          <p className='paper-abstract'>
            We investigate conditional adversarial networks as a general-purpose
            solution to image-to-image translation problems.
          </p>
        </div>

        <div className='paper-subinfo'>
          <Link to='/detail/1q2w3e4r' className='link-to-detail'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M288 48H136c-22.092 0-40 17.908-40 40v336c0 22.092 17.908 40 40 40h240c22.092 0 40-17.908 40-40V176L288 48zm-16 144V80l112 112H272z'></path>
            </svg>
            Paper
          </Link>

          <a className='link-to-github' href='https://github.com/minimal1'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9 1.4.3 2.6.4 3.8.4 8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1-8.4 1.9-15.9 2.7-22.6 2.7-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1 10.5 0 20-3.4 25.6-6 2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 1.6-.5 5-.5 8.1 0 26.4 3.1 56.6 24.1 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 30.2-21 48.5-24.1 56.6-24.1 3.4 0 5 .5 5 .5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5 1.2 0 2.6-.1 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z'></path>
            </svg>
            Code
          </a>
        </div>
      </div>
    );
  }
}

export default Item;
