const program = require('commander');

const {
    findValue
} = require('./index');

program.version('1.0.0')
       .description('cli demo')


//execute next line in cmd in order to check CLI
//node commands.js energy_market Forecast --area "SEPS CA" --timeres 2 --date 2018-01-01

program.command('energy_market <value>')
        .alias('energy')
        .description('find some tuples')
        .option('-a, --area <area>','add area')
        .option('-t, --timeres <timeres>','add resolution code')
        .option('-d, --date <date>','add date YYYY-MM-DD')
        .action((value,cmdObj) =>{
        findValue(value,cmdObj.area , parseInt(cmdObj.timeres),parseInt(cmdObj.date.substring(0,4)),parseInt(cmdObj.date.substring(5,7)),parseInt(cmdObj.date.substring(8,10)));
    });


program.parse(process.argv);



