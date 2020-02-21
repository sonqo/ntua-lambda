const mongoose = require('mongoose');


const db = mongoose.connect('mongodb://localhost:27017/Market',{useNewUrlParser: true,  useUnifiedTopology: true })
                    .then(() => console.log("Connected to MongoDB..."))
                    .catch(err => console.error('Problem',err));

const Resolution = require('./models/resolution');
const Forecast = require('./models/forecast');
const Area = require('./models/area');
const Map = require('./models/map');




 //function for further use
const findValue = (par0,par1,par2,par3,par4,par5) => {
    
    //console.log(par4);
    if (par0 === 'Forecast'){
    Forecast.find({AreaName: par1, ResolutionCodeId :par2 ,Year:par3, Month:par4, Day:par5})
            .then(result => {
                console.log(result);
                mongoose.connection.close()

            });
    }
    else{
        console.log('Here goes other code...');
    }
}


module.exports = {
    findValue
}