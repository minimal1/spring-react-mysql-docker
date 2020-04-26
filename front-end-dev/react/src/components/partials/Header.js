/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from "antd";
import { getCurrentUser } from "../../util/APIUtils";

const { Search } = Input;

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keyword: "",
		};
	}

	componentDidUpdate(prevProps, prevState, snapshots) {
		if (prevProps.keyword !== this.props.keyword) {
			const keyword = this.props.keyword;
			this.setState({ keyword });
		}
	}

	handleChange = (e) => {
		const {
			target: { value },
		} = e;

		this.setState({
			keyword: value,
		});
	};

	handleLogout = (e) => {
		this.props.onLogout();
	};

	handleSubmit = (e) => {
		const keyword = this.state.keyword;
		this.props.onSearch(keyword);
	};

	toggleFilter = (e) => {
		e.preventDefault();
		this.props.toggleFilter();
	};

	render() {
		const { isAuthenticated, currentUser } = this.props;

		const { keyword } = this.state;
		return (
			<header className="header">
				<div className="header__wrapper">
					<div className="header__column">
						<Link to="/" className="header__link link">
							<img
								src="/imgs/logo.png"
								className="header__logo"
							/>
						</Link>
					</div>
					<div className="header__column">
						<Search
							prefix={
								<a
									className="header__filterBtn"
									onClick={this.toggleFilter}
								>
									<i className="fas fa-bars"></i>
								</a>
							}
							placeholder="Input search text"
							onChange={this.handleChange}
							value={keyword}
							onSearch={this.handleSubmit}
							className="header__search"
						/>
					</div>
					<div className="header__column">
						{isAuthenticated ? (
							currentUser.student_number === "admin" ? (
								<ul className="header__list">
									<li>
										<Link
											to="/upload"
											className="header__link link"
										>
											Upload
										</Link>
									</li>
									<li>
										<Link
											to="/admin"
											className="header__link link"
										>
											Admin
										</Link>
									</li>
									<li>
										<a
											className="header__link link"
											onClick={this.handleLogout}
										>
											Logout
										</a>
									</li>
								</ul>
							) : (
								<ul className="header__list">
									<li>
										<Link
											to="/upload"
											className="header__link link"
										>
											Upload
										</Link>
									</li>
									<li>
										<Link
											to="/mypage"
											className="header__link link"
										>
											Mypage
										</Link>
									</li>
									<li>
										<a
											className="header__link link"
											onClick={this.handleLogout}
										>
											Logout
										</a>
									</li>
								</ul>
							)
						) : (
							<ul className="header__list">
								<li>
									<Link
										to="/login"
										className="header__link link"
									>
										Log In
									</Link>
								</li>
								<li>
									<Link
										to="/register"
										className="header__link link"
									>
										Register
									</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
