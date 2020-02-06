/** @format */

import React from 'react';
import Title from './Container/Title';
import InfiniteList from './Container/InfiniteList';
import Loading from './Container/Loading';

function Container(props) {
  return (
    <section>
      <InfiniteList />
      <Loading />
    </section>
  );
}

export default Container;
