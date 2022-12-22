import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: props.chartData,
			chartType: props.chartType
		};
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
		queryType: 'none'
	};
	chooseChart() {
		if (this.state.chartType == 'bar') {
			return (
				<Bar
					data={this.state.chartData}
					options={{
						title: {
							display: this.props.displayTitle,
							text: 'Results for ' + this.props.queryType,
							fontSize: 25
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						}
					}}
				/>
			);
		}
		if (this.state.chartType == 'line') {
			return (
				<Line
					data={this.state.chartData}
					options={{
						title: {
							display: this.props.displayTitle,
							text: 'Results for ' + this.props.queryType,
							fontSize: 25
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						}
					}}
				/>
			);
		}
		if (this.state.chartType == 'pie') {
			return (
				<Pie
					data={this.state.chartData}
					options={{
						title: {
							display: this.props.displayTitle,
							text: 'Results for ' + this.props.queryType,
							fontSize: 25
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						}
					}}
				/>
			);
		}
	}

	render() {
		return <div className="chart">{this.chooseChart()}</div>;
	}
}

export default Chart;
