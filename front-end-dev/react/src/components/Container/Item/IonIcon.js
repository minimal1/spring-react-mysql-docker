import React from 'react'

function IonIcon(props) {
    return (
        <ion-icon 
            className="icon hydrated"
            name={props.name}
            role={props.role}
            aria-label={props.name}
        >
            <div className="icon-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d={props.d}></path>
                </svg>
            </div>
        </ion-icon>
    )
}

export default IonIcon