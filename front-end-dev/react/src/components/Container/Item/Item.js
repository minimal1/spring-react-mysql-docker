import React from 'react'
class Item extends React.Component {
    render() {
        return (
            <div
                className="paper-item"
            >
                <a
                    className="img-link"
                    href="/"
                >
                    <img
                        className="paper-img"
                        src="/imgs/icon-logo.JPEG"
                    />
                </a>

                <div
                    className="paper-introduction"
                >
                    <a
                        className="paper-title"
                        href="/"
                    >
                        Image-to-Image Translation with Conditional Adversarial Networks
                    </a>

                    <p
                        className="paper-abstract"
                    >
                        We investigate conditional adversarial networks as a general-purpose solution to image-to-image translation problems.
                    </p>
                </div>

                <div
                    className="paper-subinfo"
                >
                    <a
                        className="link-to-detail"
                        href="/"
                    >
                        <img
                            className="paper-icon"
                            src=""
                        />
                        Paper
                    </a>

                    <a
                        className="link-to-github"
                        href="/"
                    >
                        <img
                            className="github-icon"
                            src=""
                        />
                        Code
                    </a>
                </div>
            </div>
        )
    }
}

export default Item