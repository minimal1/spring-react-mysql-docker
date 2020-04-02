/** @format */

import React from "react";

function Loading(props) {
  const isLoading = props.onLoading;
  return (
    <div
      className='loading'
      style={isLoading ? { display: "block" } : { display: "none" }}
    >
      <div className='loader-ellips infinite-scroll-request'>
        <span className='loader-ellips__dot'></span>
        <span className='loader-ellips__dot'></span>
        <span className='loader-ellips__dot'></span>
        <span className='loader-ellips__dot'></span>
      </div>
    </div>
  );
}

export default Loading;
