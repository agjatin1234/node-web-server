const request= require('request');

const forecast= (location,callback) => {
    const url= 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+ encodeURIComponent(location) +'?apikey=5dRGuuH7h2TWOYtpPceGM357mwZc50fN';
    
    request({ url, json: true}, (error, response) => {
    if (error) {
        callback('Unable to connect to weather services!',undefined);
    }
    else if (response.body.Message){
        callback("No such Location",undefined);
    }
    else{
    callback(undefined, response.body.Headline.Text+ ". Todays Temperature is "+ response.body.DailyForecasts[0].Temperature.Maximum.Value + " F. And Chances of Rain is "+ response.body.DailyForecasts[0].Day.PrecipitationIntensity);
    }
});
};

module.exports= forecast