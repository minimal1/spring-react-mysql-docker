/** @format */

import React from "react";
import Item from "./Item";

class InfiniteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const paperList = this.props.allPaper;
    return (
      <ul className='item-list'>
        {paperList.map((p) => (
          <Item
            key={p.id}
            id={p.id}
            thumbnail={p.thumbnail}
            title={p.title}
            keyName={p.key_name}
            github={p.github}
            description_1={p.description1}
          />
        ))}
      </ul>
    );
  }
}

export default InfiniteList;
