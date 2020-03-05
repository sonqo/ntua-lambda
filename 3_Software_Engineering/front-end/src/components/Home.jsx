import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Charts';

import './css/Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: '',
			chartData: {}
		};
	}

	render() {
		return (
			<div>
				<br />
				<h3>Energy Market App</h3>
				<p>
					Καλως ήλθατε στην εφαρμογή μας!
					<br />
					Στόχος της εφαρμογής είναι η παροχή υπηρεσιών πληροφόρησης για την
					κατανάλωση ηλεκτρικής ενέργειας σε χώρες της Ευρώπης.
					<br />
					<br />
					Επισκεφθείτε την σελίδα Login για να συνδεθείτε και να αποκτήσετε
					πρόσβαση στα δεδομένα.
				</p>
				<br />
				<h6>MongoDB: {this.state.status}</h6>
			</div>
		);
	}
}
