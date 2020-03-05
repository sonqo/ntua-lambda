import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import logo from './logo.png';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import About from './components/About';
import Admin from './components/Admin';
import Login from './components/Login';
import Logout from './components/Logout';
import Dataset from './components/Dataset';
import ActualTotalLoad from './components/Datasets/ActualTotalLoad';
import ActualVsForecast from './components/Datasets/ActualVsForecast';
import DayAheadTotalLoadForecast from './components/Datasets/DayAheadTotalLoadForecast';
import AggregatedGenerationPerType from './components/Datasets/AggregatedGenerationPerType';

function App() {
	return (
		<div>
			<Container>
				<img src={logo} />
			</Container>
			<NavBar />
			<Router>
				<div className="container">
					<div className="auth-wrapper">
						<div className="auth-inner">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/Login" component={Login} />
								<Route path="/Logout" component={Logout} />
								<Route path="/Dataset" component={Dataset} />
								<Route path="/About" component={About} />
								<Route path="/Admin" component={Admin} />
								<Route path="/ActualTotalLoad" component={ActualTotalLoad} />
								<Route
									path="/AggregatedGenerationPerType"
									component={AggregatedGenerationPerType}
								/>
								<Route
									path="/DayAheadTotalLoadForecast"
									component={DayAheadTotalLoadForecast}
								/>
								<Route path="/ActualvsForecast" component={ActualVsForecast} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
			<br />
			<br />
			<div class="footer">
				<p>NTUA ECE - SoftEng 2019-2020 </p>
			</div>
		</div>
	);
}

export default App;
