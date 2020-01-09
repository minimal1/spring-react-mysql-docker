/** @format */

import React from 'react';
import Item from './Item/Item';

class InfiniteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='infinite-list'>
				<Item />
				{/* list */}
			</div>
		);
	}
}

export default InfiniteList;
