/** @format */

import React from "react";
import Item from "./Item";

class InfiniteList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const paperList = this.props.allPaper;
    let paperLi = undefined;

    if (paperList !== undefined) {
      paperLi = paperList.map((p) => (
        <Item
          key={p.id}
          id={p.id}
          thumbnail={p.thumbnail}
          title={p.title}
          keyName={p.key_name}
          github={p.github}
          description_1={p.description1}
          hashtag={p.hashtag}
        />
      ));
    }
    return <ul className='item-list'>{paperLi}</ul>;
  }
}

export default InfiniteList;
