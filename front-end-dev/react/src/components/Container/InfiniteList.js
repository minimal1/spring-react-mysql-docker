/** @format */

import React from "react";
import Item from "./Item/Item";

class InfiniteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const paperList = this.props.allPaper;
    return (
      <div className='infinite-list'>
        <ul>
          {paperList.map((p) => (
            <li key={p.id}>
              <Item
                id={p.id}
                thumbnail={p.thumbnail}
                title={p.title}
                keyName={p.key_name}
                github={p.github}
                description_1={p.description_1}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InfiniteList;
