/** @format */

import React from 'react';
import Item from './Item/Item';

class InfiniteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const paperList = this.props.allPaper;
		console.log(paperList)
		console.log(typeof(paperList))
		return (
			<div className='infinite-list'>
				<ul>
					{paperList.map(p => (<Item
											keyName={p.key_name}
											github={p.github}
											category={p.category}
											professor={p.professor}
											description_1={p.description_1}
											description_2={p.description_2}
											description_3={p.description_3}
										/>))}
				</ul>
			</div>
		);
	}
}

export default InfiniteList;
