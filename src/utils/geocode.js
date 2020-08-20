const request= require('request');

const geocode= (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWdqYXRpbjEyMzQ1IiwiYSI6ImNrZDNjamdtdzBldTkycm55N3NsYWcwbDkifQ.X_KRrwkChq1Uj0Er69B1qg';
    request({ url, json: true}, (error, response) => {
    if (error) {
        callback('Unable to connect to waether services!',undefined);
    }
    else if (response.body.features.length===0) {
        callback("No such area exist!",undefined);
    }
    else {
    const data= {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
         }
    callback(undefined, data)     
    }
});
};

module.exports= geocode