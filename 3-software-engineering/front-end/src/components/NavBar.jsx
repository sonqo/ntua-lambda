import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
	Container
} from 'react-bootstrap';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		};
		this.renderLogin = this.renderLogin.bind(this);
	}

	handleLogout(event) {
		const token = window.sessionStorage.getItem('token');
		console.log(token);
		axios
			.delete('http://localhost:8765/energy/api/Logout', {
				headers: {
					'X-OBSERVATORY-AUTH': `Bearer ${token}`
				}
			})
			.then((res) => {
				window.sessionStorage.removeItem('token');
				this.props.history.push('/');
			})
			.catch((err) => {
				console.log(err);
			});
		event.preventDefault();
	}

	renderLogin() {
		// this.setState({
		// 	token: window.sessionStorage.getItem('token')
		// });

		return window.sessionStorage.getItem('token') == null ? (
			<Container>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/">Energy Market App</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/Login">Login</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		) : (
			<Container>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/">Energy Market App</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							{/* <Nav.Link href="/aboutus">About Us</Nav.Link> */}
							<NavDropdown title="Dataset" id="basic-nav-dropdown">
								<NavDropdown.Item href="/ActualTotalLoad">
									Actual Total Load
								</NavDropdown.Item>
								<NavDropdown.Item href="/AggregatedGenerationPerType">
									Aggregated Generation Per Type
								</NavDropdown.Item>
								<NavDropdown.Item href="/DayAheadTotalLoadForecast">
									Day Ahead Actual Total Load Forecast
								</NavDropdown.Item>
								<NavDropdown.Item href="/ActualvsForecast">
									Actual Vs Forecast
								</NavDropdown.Item>
								{/* <NavDropdown.Divider /> */}
							</NavDropdown>
							<Nav.Link href="/About">About</Nav.Link>
							<Nav.Link href="/Logout" onClick={this.handleLogout}>
								Logout
							</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		);
	}

	render() {
		return (
			<div>
				<br />
				{this.renderLogin()}
			</div>
		);
	}
}

export default NavBar;
