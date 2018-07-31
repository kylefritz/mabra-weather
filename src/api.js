const proxy = "https://cors-anywhere.herokuapp.com/";
const api   = "https://api.darksky.net/forecast/";
const key   = "3d3213bf0f61d6bac9aa102916be3b7e";
const base  = proxy + api + key + "/";

function getTimeWeather(lat, long, year, month, date, offset){

    const time      =   Date.UTC( year, month - 1, date + 1, 0, 0, 1 ) / 1000 + offset * 86400
    const request   =   base + lat + "," + long + "," + time;

    return window.fetch(request, {

        method  :   "GET",

        headers :   { "Accept"        : "application/json"  ,
                    "Origin"        : null                ,
                    "content-type"  : "application/json"  , }

    } ).then( response => {

        const  json = response.json();
        
        return json;

    } )

}

export function getAllWeather(lat, long, year, month, date){

    let results = [];

    return Promise.all([

        getTimeWeather  ( lat, long, year, month, date, -3, ),
        getTimeWeather  ( lat, long, year, month, date, -2, ),
        getTimeWeather  ( lat, long, year, month, date, -1, ),
        getTimeWeather  ( lat, long, year, month, date,  0, ),

    ] ).then( response =>  {

        results.push(response);

        return results

    } );

}


