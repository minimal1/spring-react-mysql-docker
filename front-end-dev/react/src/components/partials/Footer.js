/** @format */

import React from "react";

function Footer(props) {
  return (
    <footer className='footer'>
      {/* <img src='/imgs/icon-logo.png' className='footer__logo' /> */}
      <span className='footer__text'>
        HeapOfPaper {new Date().getFullYear()} &copy;
      </span>
    </footer>
  );
}

export default Footer;
