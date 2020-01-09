/** @format */

import React from 'react';

function Loading() {
	return (
		<div className='loading' style={{ display: null }}>
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
