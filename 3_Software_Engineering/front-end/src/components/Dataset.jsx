import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Dataset extends Component {
	render() {
		return (
			<div>
				<h3>Dataset</h3>
				<Link className="menu-item" to={'/actualtotalload'}>
					Actual Total Load
				</Link>
				<Link className="menu-item" to={'/dayahead'}>
					Day Ahead
				</Link>
				<Link className="menu-item" to={'/actualvsforecast'}>
					Actual vs Forecast
				</Link>
			</div>
		);
	}
}
