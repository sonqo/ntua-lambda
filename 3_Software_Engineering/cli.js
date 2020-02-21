#!/usr/bin/env node
// dont forget to npm link

const program = require('commander');
//const { addContact, getContact } = require('./logic');
const { prompt } = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'scope',
    message: 'Set scope...',
  },
  {
    type: 'input',
    name: 'area',
    message: 'Set area...',
  },
  {
    type: 'input',
    name: 'timeres',
    message: 'Set timeres...',
  },
  {
    type: 'input',
    name: 'year',
    message: 'Set year...',
  },
  {
    type: 'input',
    name: 'month',
    message: 'Set month...',
  },
  {
    type: 'input',
    name: 'date',
    message: 'Set date...',
  },
];

program.version('0.0.1').description('EnergyMarketApp');

program
  .command('scope') // No need to specify arguments here
  .alias('s')
  .description('Set scope')
  .action(() => {
    prompt(questions).then(answers => console.log('scope action here'));
  });
program
  .command('area')
  .alias('a')
  .description('Set area')
  .action(() => {
    prompt(questions).then(answers => console.log('area action here'));
  });
program
  .command('timeres')
  .alias('t')
  .description('Set timeres')
  .action(() => {
    prompt(questions).then(answers => console.log('timeres action here'));
  });
program
  .command('year')
  .alias('y')
  .description('Set year')
  .action(() => {
    prompt(questions).then(answers => console.log('year action here'));
  });
program
  .command('month')
  .alias('m')
  .description('Set month')
  .action(() => {
    prompt(questions).then(answers => console.log('month action here'));
  });
program
  .command('date')
  .alias('d')
  .description('Set date')
  .action(() => {
    prompt(questions).then(answers => console.log('date action here'));
  });

program.parse(process.argv);
