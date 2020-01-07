import React from 'react'

function ItemContent(props) {
    return (
        <div className="col-lg-9 item-content">
            <h1>
                <a 
                    herf="https://github.com/minimal1">
                    Paper Title
                </a>
            </h1>

            <p 
                className="author-section"
                style={{
                    paddingTop: 2,
                }}>
                <span className="author-name-text">24 Nov 2019</span>
                • 
                <a 
                    href="https://github.com/minimal1"
                    sytle={{
                        fontSize: 13,
                    }}>
                    minimal1
                </a>
                •
                {/* <img /> */}
            </p>

            <p className="item-strip-abstract">
                "Who is minimal1? He is the legend of CNU. Everyone wants to be Minimal1"
            </p>
            {/* <div>???</div> */}
            <p>
                <a href="https://www.google.com">
                    <span className="badge badge-primary">
                        MINIMAL
                    </span>
                </a>
            </p>
        </div>
    )
}

export default ItemContent