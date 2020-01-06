import React from 'react'

function Title(props) {
    return (
        <div className="title">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="home-page-title">
                        {props.title}
                    </h1>
                </div>
                <div className="col-lg-6">
                    <div className="result-filter">
                        <ul
                            className="result-filter list"
                        >
                            <li 
                                className="list-item"
                            >
                                <a
                                    herf="/"
                                    className="button-active"
                                >
                                    Trend
                                </a>
                            </li>
                            <li 
                                className="list-item"
                            >
                                <a
                                    herf="/"
                                    className="button"
                                >
                                    Lastest
                                </a>
                            </li>
                            <li 
                                className="list-item"
                            >
                                <a
                                    herf="/"
                                    className="button"
                                >
                                    Greatest
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title