import React from 'react'

class Header extends React.Component { 
    render() {
        return (
            <header>
                <a 
                    className="link"
                >
                    <img
                        className="header-logo"
                        src="/imgs/icon-logo.JPEG"
                    />
                </a>
                
                <form
                    className="search-form mr-auto"
                >
                    <input 
                        type="text"
                        name="keyword"
                        className="search-input"
                        placeholder="Search"
                    />
                    <button
                        className="icon"
                    >
                        <img
                            src="/imgs/icon-search.png"
                        />
                    </button>
                </form>
                
                <nav
                    className="header-nav"
                >
                    <ul
                        className="header-nav list"
                    >
                        <li 
                            className="list-item nav-link-right"
                        >
                            <a
                                className="nav-link-right nav-textual-link"
                                href="http://127.0.0.1:8080"
                            >
                                <img
                                    className="nav-icon-twitter"
                                    src="/imgs/icon-twitter.png"
                                />
                                Twitter
                            </a>
                        </li>
                        <li 
                            className="list-item nav-link-right"
                        >
                            <a
                                className="nav-link-right nav-textual-link"
                                href="http://127.0.0.1:8080"
                            >
                                <img
                                    className="nav-icon-slack"
                                    src="/imgs/icon-slack.png"
                                />
                                Slack
                            </a>
                        </li>
                        <li 
                            className="list-item nav-link-right"
                        >
                            <a
                                className="nav-link-right nav-textual-link no-img"
                                href="http://127.0.0.1:8080"
                            >
                                Trends
                            </a>
                        </li>
                        <li 
                            className="list-item nav-link-right"
                        >
                            <a
                                className="nav-link-right nav-textual-link no-img"
                                href="http://127.0.0.1:8080"
                            >
                                About
                            </a>
                        </li>
                        <li 
                            className="list-item nav-link-right"
                        >
                            <a
                                className="nav-link-right nav-textual-link no-img"
                                href="http://127.0.0.1:8080"
                            >
                                Log In/Register
                            </a>
                        </li>

                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header