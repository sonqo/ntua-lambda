import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Chart from 'react-apexcharts';

export default class AggregatedGenerationPerType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			areaname: '',
			productiontype: '',
			timeresolution: '',
			datetype: '',
			date: '',
			response: null,
			options: {
				chart: {
					id: 'line'
				},
				fill: {
					opacity: 0.65
				},
				colors: ['#19A931'],
				xaxis: {
					categories: []
				},
				dataLabels: {
					enabled: false
				}
			},
			series: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleProductiontype = this.handleProductiontype.bind(this);
		this.handleAreaname = this.handleAreaname.bind(this);
		this.handleTimeresolution = this.handleTimeresolution.bind(this);
		this.handleDatetype = this.handleDatetype.bind(this);
		this.handleDate = this.handleDate.bind(this);
	}

	handleAreaname(event) {
		this.setState({
			areaname: event.target.value
		});
	}
	handleProductiontype(event) {
		this.setState({
			productiontype: event.target.value
		});
	}
	handleTimeresolution(event) {
		this.setState({
			timeresolution: event.target.value
		});
	}
	handleDatetype(event) {
		this.setState({
			datetype: event.target.value
		});
	}
	handleDate(event) {
		this.setState({
			date: event.target.value
		});
	}

	mapTimeResolution(string) {
		if (string == 'PT15M') {
			return 1;
		} else if (string == 'PT30M') {
			return 3;
		} else if (string == 'PT60M') {
			return 2;
		} else {
			return 4;
		}
	}

	handleSubmit(event) {
		const token = window.sessionStorage.getItem('token');
		axios
			.get(
				`http://localhost:8765/energy/api/AggregatedGenerationPerType/${
					this.state.areaname
				}/${this.state.productiontype}/${this.mapTimeResolution(
					this.state.timeresolution
				)}/${this.state.datetype}/${this.state.date}`,
				{
					headers: {
						'X-OBSERVATORY-AUTH': `Bearer ${token}`
					}
				}
			)
			.then((res) => {
				const realDatas = res.data.map((realData) => {
					console.log(realData.ActualGenerationOutputValue);
					if (this.state.datetype == 'date') {
						return realData.ActualGenerationOutputValue;
					}
					if (this.state.datetype == 'month') {
						return realData.ActualGenerationOutputByDayValue;
					}
				});
				this.setState({
					response: res.data,
					series: [
						{
							name: 'Value',
							data: realDatas
						}
					]
				});
			})
			.catch((err) => {
				alert(err);
			});
		event.preventDefault();
	}

	createTable(dataset) {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						{/* <th>Source</th> */}
						<th>Area Name</th>
						<th>Area Type Code</th>
						<th>Map Code</th>
						<th>Resolution Code</th>
						<th>Year</th>
						<th>Month</th>
						{this.state.datetype == 'date' || this.state.datetype == 'month' ? (
							<th>Day</th>
						) : null}
						{this.state.datetype == 'date' ? <th>DateTimeUTC</th> : null}
						<th>Production Type</th>
						{this.state.datetype == 'date' ? (
							<th>Actual Generation Output Value</th>
						) : null}
						{this.state.datetype == 'month' ? (
							<th>Actual Generation Output By Day Value</th>
						) : null}
						{this.state.datetype == 'year' ? (
							<th>Actual Generation Output By Month Value</th>
						) : null}
						{this.state.datetype == 'date' ? <th>UpdateTimeUTC</th> : null}
					</tr>
				</thead>
				<tbody>{this.fillTable(dataset)}</tbody>
			</Table>
		);
	}
	fillTable(dataset) {
		return dataset.map((details, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					{/* <td>{details.Source}</td> */}
					<td>{details.AreaName}</td>
					<td>{details.AreaTypeCode}</td>
					<td>{details.MapCode}</td>
					<td>{details.ResolutionCode}</td>
					<td>{details.Year}</td>
					<td>{details.Month}</td>
					{this.state.datetype == 'date' || this.state.datetype == 'month' ? (
						<td>{details.Day}</td>
					) : null}
					{this.state.datetype == 'date' ? (
						<td>{details.DateTimeUTC}</td>
					) : null}
					<td>{details.ProductionType}</td>
					{this.state.datetype == 'date' ? (
						<td>{details.ActualGenerationOutputValue}</td>
					) : null}
					{this.state.datetype == 'month' ? (
						<td>{details.ActualGenerationOutputByDayValue}</td>
					) : null}
					{this.state.datetype == 'year' ? (
						<td>{details.ActualGenerationOutputByMonthValue}</td>
					) : null}
					{this.state.datetype == 'date' ? (
						<td>{details.UpdateTimeUTC}</td>
					) : null}
				</tr>
			);
		});
	}

	render() {
		return (
			<div>
				<Container>
					<br />
					<h3>Aggregated Generation Per Type</h3>
					<br />
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>AreaName</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter AreaName"
								value={this.state.areaname}
								onChange={this.handleAreaname}
							/>
						</div>
						<div className="form-group">
							<label>ProductionType</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter ProductionType"
								value={this.state.productiontype}
								onChange={this.handleProductiontype}
							/>
						</div>
						<div className="form-group">
							<label>Time Resolution</label>
							<input
								type="text"
								className="form-control"
								placeholder="PT15M | PT30M | PT60M"
								value={this.state.timeresolution}
								onChange={this.handleTimeresolution}
							/>
						</div>
						<div className="form-group">
							<label>Date Type</label>
							<input
								type="text"
								className="form-control"
								placeholder="Date | Month | Year"
								value={this.state.datetype}
								onChange={this.handleDatetype}
							/>
						</div>
						<div className="form-group">
							<label>Date</label>
							<input
								type="text"
								className="form-control"
								placeholder="YYYY-MM-DD | YYYY-MM | YYYY"
								value={this.state.date}
								onChange={this.handleDate}
							/>
						</div>
						<Button variant="success" onClick={this.handleSubmit}>
							Submit
						</Button>
					</form>
					<br />
					<br />
					{this.state.response != null ? (
						<div>
							<h3>Results</h3>
							<br />
							{this.state.datetype == 'date' ||
							this.state.datetype == 'month' ? (
								<div className="app">
									<div className="row">
										<div className="mixed-chart">
											<Chart
												options={this.state.options}
												series={this.state.series}
												type="bar"
												width="1000"
												color="red"
											/>
										</div>
									</div>
								</div>
							) : null}
							{this.createTable(this.state.response)}{' '}
						</div>
					) : null}
				</Container>
			</div>
		);
	}
}
