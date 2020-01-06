import React from 'react'
import example from '../../../img/example.png'
function ItemImageCol(props) {
    return (
        <div className="col-lg-3 item-image-col">
            <a href="https://www.google.com">
                <div className="item-image"
                    style={{
                        backgroundImage: `url(${example})`
                    }}>
                </div>
            </a>
        </div>
    )
}

export default ItemImageCol