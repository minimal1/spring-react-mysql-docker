/** @format */

import React, { Component } from 'react';

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props
    };
  }
  render() {
    return (
      <section className='page-for-detail'>
        <div className='detail-for-paper'>
          <h1>
            Image-to-Image Translation with Conditional Adversarial Networks
          </h1>
          <p className='detail-for-abstract'>
            We investigate conditional adversarial networks as a general-purpose
            solution to image-to-image translation problems.
          </p>
          <a>
            <img />
            PDF
          </a>
          <a>
            <img />
            Abstract
          </a>
        </div>
        <div className='detail-for-others'>
          <div className='detail-for-code'>
            <h1>Code</h1>
            <hr />
          </div>
          <div className='detail-for-tasks'>
            <h1>Tasks</h1>
            <hr />
          </div>
        </div>
        <div className='detail-for-result'>
          <h1>Evaluation Results from the Paper</h1>
          <hr />
        </div>
      </section>
    );
  }
}

export default ItemDetail;
