import React from 'react'

class Header extends React.Component { 
    render() {
        return (
            <header>
                <a 
                    className="link"
                >
                    <img
                        className="icon-logo"
                        src="/imgs/icon-twitter.png"
                    />
                </a>
                <form
                    className="search-form"
                >
                    <input 
                        type="text"
                        name="keyword"
                        placeholder="Search for papers"
                    />
                    <button>
                        Search
                    </button>
                </form>
                <a
                    className="link"
                    href="http://127.0.0.1:8080"
                >
                    <img
                        className="icon-twitter"
                        src="/imgs/icon-twitter.png"
                    />
                    Twitter
                </a>
                <a
                    className="link"
                    href="http://127.0.0.1:8080/2"
                >
                    <img
                        className="icon-slack"
                        src="/imgs/icon-slack.png"
                    />
                    Slack
                </a>
                <a
                    className="link"
                >
                    Trends
                </a>
                <a
                    className="link"
                >
                    About
                </a>
                <a
                    className="link"
                >
                    Log In/Register
                </a>

            </header>
        )
    }
}

export default Header