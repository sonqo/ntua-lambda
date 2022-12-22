import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsername(event) {
		this.setState({
			username: event.target.value
		});
	}
	handlePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		axios
			.post('http://localhost:8765/energy/api/Login', this.state)
			.then((res) => {
				if (res.data.token != null) {
					window.sessionStorage.setItem('token', res.data.token);
					this.props.history.push('/');
				}
			})
			.catch((err) => {
				alert(err);
			});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Container>
					<h3>Sign In</h3>
					<br />
					<div className="form-group">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter username"
							value={this.state.username}
							onChange={this.handleUsername}
						/>
					</div>

					<div class="form-group">
						<label>Password</label>
						<input
							type="password"
							class="form-control"
							placeholder="Enter password"
							value={this.state.password}
							onChange={this.handlePassword}
						/>
					</div>
					<Button variant="success" onClick={this.handleSubmit}>
						Submit
					</Button>
				</Container>
			</form>
		);
	}
}
