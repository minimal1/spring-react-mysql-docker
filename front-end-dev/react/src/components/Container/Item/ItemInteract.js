import React from 'react'
import EntityStars from './EntityStars'
import Entity from './Entity'

function ItemInteract(props) {
    return (
        <div className="col-lg-3 item-interact text-center">
            <EntityStars />
            <div className="stars-accumulated text-center">1.36 stars / hour</div>
            <Entity />
        </div>
    )
}

export default ItemInteract