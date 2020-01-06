import React from 'react'
import ItemContent from './ItemContent'
import ItemInteract from './ItemInteract'

class ItemCol extends React.Component {
    render() {
        return (
            <div className="col-lg-9 item-col">
                <div className="row">
                    <ItemContent />
                    <ItemInteract />
                </div>
            </div>
        )
    }
}

export default ItemCol