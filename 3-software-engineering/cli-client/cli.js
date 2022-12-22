#!/usr/bin/env node

const program = require('commander');

const { adminf } = require('./commands/Admin');
const { resetf } = require('./commands/Reset');
const { loginf } = require('./commands/Login');
const { logoutf } = require('./commands/Logout');
const { healthf } = require('./commands/HealthCheck');
const { actualf } = require('./commands/ActualTotalLoad');
const { actvsff } = require('./commands/ActualvsForecast');
const { forecastf } = require('./commands/DayAheadTotalLoadForecast');
const { productionf } = require('./commands/AggregatedGenerationPerType');

program
	.version('1.0.0')
	.description('EnergyMarketAppAPI - BitsPlease - SoftEng2019');

program
	.command('Admin')
	.description('Administrator functionalities')
	.option('-nu , --newuser <newuser>', 'Enter username')
	.option('-mu , --moduser <moduser>', 'Enter username')
	.option('-us , --userstatus <userstatus>', 'Enter username')
	.option('-pw, --password <password>', 'Enter password')
	.option('-em, --email <email>', 'Enter email')
	.option('-q, --quota <quota>', 'Enter quotas')
	.option('-d, --newdata <newdata>', 'Enter dataset')
	.option('-s, --source <source>', 'Enter file source path')
	.action((cmdObj) => {
		adminf(
			cmdObj.newuser,
			cmdObj.moduser,
			cmdObj.userstatus,
			cmdObj.password,
			cmdObj.email,
			cmdObj.quota,
			cmdObj.newdata,
			cmdObj.source
		);
	});

program
	.command('Login')
	.description('Sign in')
	.option('-un , --username <username>', 'Enter username')
	.option('-pw , --password <password>', 'Enter password')
	.action((cmdObj) => {
		loginf(cmdObj.username, cmdObj.password);
	});

program
	.command('Logout')
	.description('Sign out')
	.action(() => {
		logoutf();
	});

program
	.command('ActualTotalLoad')
	.alias('Actual')
	.description('Find the Actual values')
	.option('-a, --area <area>', 'add area')
	.option('-t, --timeres <timeres>', 'add resolution code')
	.option('-d, --date <date>', 'add date YYYY-MM-DD')
	.option('-m, --month <date>', 'add month YYYY-MM')
	.option('-y, --year <date>', 'add year YYYY')
	.option('-f, --format <format>', 'select the format of data')
	.action((cmdObj) => {
		actualf(
			cmdObj.area,
			parseInt(cmdObj.timeres),
			cmdObj.date,
			cmdObj.month,
			cmdObj.year,
			cmdObj.format
		);
	});

program
	.command('AggregatedGenerationPerType')
	.alias('PerType')
	.description('Find the Per Type Production values')
	.option('-a, --area <area>', 'add area')
	.option('-p, --prodtype <production>', 'add production type')
	.option('-t, --timeres <timeres>', 'add resolution code')
	.option('-d, --date <date>', 'add date YYYY-MM-DD')
	.option('-m, --month <date>', 'add month YYYY-MM')
	.option('-y, --year <date>', 'add year YYYY')
	.option('-f, --format <format>', 'select the format of data')
	.action((cmdObj) => {
		productionf(
			cmdObj.area,
			cmdObj.prodtype,
			parseInt(cmdObj.timeres),
			cmdObj.date,
			cmdObj.month,
			cmdObj.year,
			cmdObj.format
		);
	});

program
	.command('DayAheadTotalLoadForecast')
	.alias('Forecast')
	.description('Find the Forecast values')
	.option('-a, --area <area>', 'add area')
	.option('-t, --timeres <timeres>', 'add resolution code')
	.option('-d, --date <date>', 'add date YYYY-MM-DD')
	.option('-m, --month <date>', 'add month YYYY-MM')
	.option('-y, --year <date>', 'add year YYYY')
	.option('-f, --format <format>', 'select the format of data')
	.action((cmdObj) => {
		forecastf(
			cmdObj.area,
			parseInt(cmdObj.timeres),
			cmdObj.date,
			cmdObj.month,
			cmdObj.year,
			cmdObj.format
		);
	});

program
	.command('ActualvsForecast')
	.alias('ActvsFor')
	.description('Compare Actual and Forecast values')
	.option('-a, --area <area>', 'add area')
	.option('-t, --timeres <timeres>', 'add resolution code')
	.option('-d, --date <date>', 'add date YYYY-MM-DD')
	.option('-m, --month <date>', 'add month YYYY-MM')
	.option('-y, --year <date>', 'add year YYYY')
	.option('-f, --format <format>', 'select the format of data')
	.action((cmdObj) => {
		actvsff(
			cmdObj.area,
			parseInt(cmdObj.timeres),
			cmdObj.date,
			cmdObj.month,
			cmdObj.year,
			cmdObj.format
		);
	});

program
	.command('HealthCheck')
	.description('Check Mongo connection')
	.action(() => {
		healthf();
	});

program
	.command('Reset')
	.description('Delete all users except admin')
	.action(async () => {
		resetf();
	});

program.parse(process.argv);
