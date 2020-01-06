import React from 'react'
import IonIcon from './IonIcon'

function EntityStars(props) {
    return (
        <div className="entity-stars">
            <span className="badge badge-secondary">
                <IonIcon 
                    name="star" 
                    role="img" 
                    d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"
                />
                 98
            </span>   
        </div>
    )
}

export default EntityStars