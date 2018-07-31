import React, { Component } from 'react'        ;
import {getAllWeather}      from './api'        ;
import {hours}              from './App'        ;
import breg                 from './breg16.png' ;
import goog                 from './goog16.png' ;
import waze                 from './waze16.png' ;
import rslt                 from './rslt16.png' ;

import './vis.css' ;
import {XYPlot, VerticalBarSeries, LineSeries, HorizontalBarSeries, Crosshair} from 'react-vis' ;

const   predays     =   [ 
                        { label: "-3 Days"  , index: 0  ,  } ,
                        { label: "-2 Days"  , index: -2 ,  } ,
                        { label: "-1 Day"   , index: -1 ,  } ,
                        ];

const   weekdays    =   [   
                        "Sunday"    ,
                        "Monday"    ,
                        "Tuesday"   ,
                        "Wednesday" ,
                        "Thursday"  ,
                        "Friday"    ,
                        "Saturday"  , 
                        ];

const   emojiKey    =   {   
                        "clear-day"             :   "☀"     ,   
                        "clear-night"           :   "☀"     ,   
                        "rain"                  :   "💧"    ,  
                        "snow"                  :   "❄"     ,   
                        "sleet"                 :   "❄"     ,   
                        "hail"                  :   "❄"     ,   
                        "wind"                  :   "🚩"    ,  
                        "fog"                   :   "🌫"    ,  
                        "cloudy"                :   "☁"     ,   
                        "partly-cloudy-day"     :   "🌤"    ,  
                        "partly-cloudy-night"   :   "🌤"    ,  
                        "thunderstorm"          :   "⚡"     ,   
                        "tornado"               :   "🌪"    ,  
                        "other"                 :   "❗"     ,   
                        };

export class Row extends Component {

    state = {
        loading : true  ,
        weather : []    ,
    }

    componentDidMount() {

        const lat   =   this.props.lat      ;
        const long  =   this.props.long     ;
        const year  =   this.props.year     ;
        const month =   this.props.month    ;
        const date  =   this.props.date     ;    

        Promise.all([

            getAllWeather(lat, long, year, month, date)

        ] )

        .then( results => {

            const flatResults = results[0][0]

            this.setState({ 
                loading : false ,
                weather : flatResults ,
            } )

        } )

    }
    
    render () {

        if ( this.state.loading ) {
            return (
                <div className="event sideBar">
                    🚀omw from outer space brb
                </div>
            )
        }

        else {

            const today     =   new Date(Date.now() - 1 * 86400000)                                         ;
            const raceDay   =   Date.parse( new Date ( this.state.weather[3].daily.data[0].time * 1000 ) )  ;
            const opacity   =   ( today > raceDay ) ? "past" : ""                                           ;

            return (
                <div className={"flexBin " + opacity}> 
                    <Event 
                        name    =   {this.props.name}
                        weather =   {this.state.weather} 
                        lat     =   {this.props.lat}
                        long    =   {this.props.long}
                    />
                    <PreLabels />
                    { predays.map( (day, i) =>
                        <PreDaily  
                            key     =   { i }
                            {...day}
                            weather =   {this.state.weather}
                            index   =   { i }
                        />
                    ) }
                    <RaceDaily 
                        weather =   {this.state.weather} 
                    />
                    <div>
                        <div className="flexBin">
                            <HourlyText   
                                weather =   {this.state.weather}    
                            />
                        </div>
                        <HourlyGraph 
                            weather =   {this.state.weather}    
                        />
                    </div>
                    
                </div>
            )
        }
    }
}

class Event extends Component {

    render() {

        const daily = this.props.weather[3].daily.data[0]

        const time  = new Date (daily.time * 1000)  ;
        const day   = weekdays[time.getDay()]       ;
        const month = time.getMonth() + 1           ;
        const date  = time.getDate()                ;

        const bregUrl = "https://www.bikereg.com/events/Cyclocross/?ns="+this.props.name                ;
        const googUrl = "https://maps.google.com/?daddr="+this.props.lat+","+this.props.long            ;
        const wazeUrl = "https://waze.com/ul?ll="+this.props.lat+","+this.props.long+"&navigate=yes"    ;
        const rsltUrl = "https://www.crossresults.com/search?q="+this.props.name                        ;

        return (
            <div className="event sideBar border">
                {this.props.name}<br />
                <br />
                {month}/{date}<br />
                {day}<br />
                <br />
                <a href={bregUrl}><img src={breg} /></a>&nbsp;
                <a href={googUrl}><img src={goog} /></a>&nbsp;
                <a href={wazeUrl}><img src={waze} /></a>&nbsp;
                <a href={rsltUrl}><img src={rslt} /></a>        
            </div>
        );
    }
}

class PreLabels extends Component {
    render() {
        return (
            <div className="preLabels">
                <div className="summary">
                    {/* spacer */}
                </div>
                <br />
                Temp<br />
                Wind<br />
                Cloud Cover<br />
                Precip Change<br />
                Precip Amount<br />
            </div>
        );
    }
}

class PreDaily extends Component {

    render() {

        const daily         =   this.props.weather[this.props.index].daily.data[0]  ;

        const icon          =   emojiKey[daily.icon]                                ;
        const summary       =   daily.summary                                       ;
        const tempLowFixed  =   daily.temperatureLow.toFixed(0)                     ;
        const tempHighFixed =   daily.temperatureHigh.toFixed(0)                    ;
        const windFixed     =   daily.windSpeed.toFixed(0)                          ;
        const cloudFixed    =   ( daily.cloudCover        * 100 ).toFixed(0)        ;
        const chanceFixed   =   ( daily.precipProbability * 100 ).toFixed(0)        ;
        const precipFixed   =   ( daily.precipIntensity   * 24  ).toFixed(2)        ;
        
        return (
            <div className="preDays">
                <div className="summary">
                {icon} {summary}
                </div>
                <br />
                <span className="right">{tempLowFixed}° - {tempHighFixed}°  </span><br />
                <span className="right">{windFixed}mph                      </span><br />
                <span className="right">{cloudFixed}%                       </span><br />
                <span className="right">{chanceFixed}%                      </span><br />
                <span className="right">{precipFixed}in                      </span><br />
            </div>
        )
    }
}

class RaceDaily extends Component {

    render() {

        const daily             =   this.props.weather[3].daily.data[0]                         ;

        const icon              =   emojiKey[daily.icon]                                        ;
        const summary           =   daily.summary                                               ;
        const tempLowFixed      =   daily.temperatureLow.toFixed(0)                             ;
        const tempHighFixed     =   daily.temperatureHigh.toFixed(0)                            ;
        const feelLowFixed      =   daily.apparentTemperatureLow.toFixed(0)                     ;
        const feelHighFixed     =   daily.apparentTemperatureHigh.toFixed(0)                    ;
        const windFixed         =   daily.windSpeed.toFixed(0)                                  ;
        const cloudFixed        =   ( daily.cloudCover        * 100 ).toFixed(0)                ;
        const chanceFixed       =   ( daily.precipProbability * 100 ).toFixed(0)                ;
        const precipFixed       =   ( daily.precipIntensity   * 24  ).toFixed(2)                ;
        const sunriseHour       =   ( new Date ( daily.sunriseTime * 1000 ) ).getHours()        ;
        const sunriseMin        =   ( new Date ( daily.sunriseTime * 1000 ) ).getMinutes()      ;
        const sunriseMinFixed   =   sunriseMin < 10 ? "0" + sunriseMin : sunriseMin             ;
        const sunsetHour        =   ( new Date ( daily.sunsetTime  * 1000 ) ).getHours() - 12   ;
        const sunsetMin         =   ( new Date ( daily.sunsetTime  * 1000 ) ).getMinutes()      ;
        const sunsetMinFixed    =   sunsetMin  < 10 ? "0" + sunsetMin  : sunsetMin              ;
                        
        return (
            <div className="raceDay highlight">
                <div className="summary">
                    {icon} {summary}
                </div>
                Feel            <span className="right">{feelLowFixed}° - {feelHighFixed}°                                  </span><br />
                Temp            <span className="right">{tempLowFixed}° - {tempHighFixed}°                                  </span><br />
                Wind            <span className="right">{windFixed}mph                                                      </span><br />
                Cloud Cover     <span className="right">{cloudFixed}%                                                       </span><br />
                Precip Chance   <span className="right">{chanceFixed}%                                                      </span><br />
                Precip Amount   <span className="right">{precipFixed}in                                                      </span><br />
                Sunrise Sunset  <span className="right">{sunriseHour}:{sunriseMinFixed}a - {sunsetHour}:{sunsetMinFixed}p   </span><br />
                <br />
            </div>
        )
    }
}

class HourlyText extends Component {

    render() {
        
        const hourly = this.props.weather[3].hourly.data

        return (
            <React.Fragment>
                { hours.map( (hour, i) =>
                    <HourText  
                        key     = { i }
                        {...hour}
                        weather = {hourly[i]}
                        fullDay = {this.props.weather[3]}
                        num     = { i }
                    />
                ) }
            </React.Fragment>
        )
    }
}

class HourText extends Component {

    render() {
        
        const hour          =   this.props.weather                              ;
        const icon          =   emojiKey[hour.icon]                             ;
        const feelFixed     =   hour.apparentTemperature.toFixed(0)             ;
        const tempFixed     =   hour.temperature.toFixed(0)                     ;
        const windFixed     =   hour.windSpeed.toFixed(0)                       ;
        const cloudFixed    =   ( hour.cloudCover        * 100  ).toFixed(0)    ;
        const chanceFixed   =   ( hour.precipProbability * 100  ).toFixed(0)    ;
        const precipMmFixed =   ( hour.precipIntensity   * 25.4 ).toFixed(1)    ;
           
        const sunriseHour   =   ( new Date ( this.props.fullDay.daily.data[0].sunriseTime * 1000 ) ).getHours()   ;
        const sunsetHour    =   ( new Date ( this.props.fullDay.daily.data[0].sunsetTime  * 1000 ) ).getHours()   ;
        const sunsetHourFixed        =   ( new Date ( this.props.fullDay.daily.data[0].sunsetTime  * 1000 ) ).getHours() - 12   ;


        const sunriseMin        =   ( new Date ( this.props.fullDay.daily.data[0].sunriseTime * 1000 ) ).getMinutes()      ;
        const sunriseMinFixed   =   sunriseMin < 10 ? "0" + sunriseMin : sunriseMin             ;
        const sunsetMin         =   ( new Date ( this.props.fullDay.daily.data[0].sunsetTime  * 1000 ) ).getMinutes()      ;
        const sunsetMinFixed    =   sunsetMin  < 10 ? "0" + sunsetMin  : sunsetMin              ;

        const sunIcon       =   (this.props.num === sunriseHour) 
                                    ? (sunriseHour+":"+sunriseMinFixed+"a")
                                    :   (this.props.num === sunsetHour)
                                        ? (sunsetHourFixed+":"+sunsetMinFixed+"p")
                                        : "";

        return (

            <div>
                <div className="hourly">
                    <div className="summary">
                        <div className="bottom">
                            {icon}
                        </div>
                    </div>
                    <span className="feel">{feelFixed}°</span><br />
                    <span className="temp">{tempFixed}°</span><br />
                    <span className="wind">{windFixed}mph</span><br />
                    <span className="cloud">{cloudFixed}%</span><br />
                    <span className="chance">{chanceFixed}%</span><br />
                    <span className="amount">{precipMmFixed}mm</span><br />
                    <span className="sun">{sunIcon}</span><br />
                </div>
            </div>
        )
    }
}

class HourlyGraph extends Component {
    
    render() {

            const hourly = this.props.weather[3].hourly.data

            let feelData =[]
            { hours.map( (hour, i) =>
                feelData.push( {x: i, y: hourly[i].apparentTemperature.toFixed(0) } )
            ) }

            let tempData =[]
            { hours.map( (hour, i) =>
                tempData.push( {x: i, y: hourly[i].temperature.toFixed(0) } )
            ) }

            let windData =[]
            { hours.map( (hour, i) =>
                windData.push( {x: i, y: hourly[i].windSpeed.toFixed(0) } )
            ) }

            let cloudData =[]
            { hours.map( (hour, i) =>
                cloudData.push( {x: i, y: ( hourly[i].cloudCover * 100  ).toFixed(0) } )
            ) }

            let chanceData =[]
            { hours.map( (hour, i) =>
                chanceData.push( {x: i, y: ( hourly[i].precipProbability * 100  ).toFixed(0) } )
            ) }

            let precipMmData =[]
            { hours.map( (hour, i) =>
                precipMmData.push( {x: i, y: ( hourly[i].precipIntensity * 25.4  ).toFixed(1) } )
            ) }

            let tempBottom    =   Math.min.apply(Math, tempData.map(function(z) { return z.y; })) - 5   ;
            let tempTop       =   Math.max.apply(Math, tempData.map(function(z) { return z.y; })) + 5   ;

            const sunriseHour   =   ( new Date ( this.props.weather[3].daily.data[0].sunriseTime * 1000 ) ).getHours()      ;
            const sunsetHour    =   ( new Date ( this.props.weather[3].daily.data[0].sunsetTime  * 1000 ) ).getHours()      ;    
            const sunriseMin    =   ( new Date ( this.props.weather[3].daily.data[0].sunriseTime * 1000 ) ).getMinutes()    ;
            const sunsetMin     =   ( new Date ( this.props.weather[3].daily.data[0].sunsetTime  * 1000 ) ).getMinutes()    ;

            const risePer       =   ( 60 * sunriseHour + sunriseMin ) / ( 60 * 24 ) ;
            const setPer        =   ( 60 * sunsetHour  + sunsetMin  ) / ( 60 * 24 ) ;

            const sunChangetime =   0.2 / 24    ;

            const preRisePer    =   risePer - sunChangetime     ;
            const postRisePer   =   risePer + sunChangetime     ;
            const preSetPer     =   setPer - sunChangetime      ;
            const postSetPer    =   setPer + sunChangetime      ;

            const postRiseNet   =   postRisePer -   preRisePer  ;
            const preSetNet     =   preSetPer   -   postRisePer ;
            const postSetNet    =   postSetPer  -   preSetPer   ;
            const remainderNet  =   1           -   postSetPer  ;

        return (

            <div>
                <div className="outer">
                <div className="graphSpacer">
                        {/* spacer */}
                    </div>
                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 0, right: 0, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: 0 } ] } color="#000000" />
                            <LineSeries data={ [ { x:0   ,   y: 1 } ] } color="#000000" />
                            <VerticalBarSeries data={precipMmData} color="#B4DFE4"/>
                        </XYPlot>
                    </div>

                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: 0 } ] } color="#000000" />
                            <LineSeries data={ [ { x:0   ,   y: 20 } ] } color="#000000" />
                            <LineSeries data={windData} color="#AA4A92"/>
                        </XYPlot>
                    </div>

                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: 0 } ] } color="#000000" />
                            <LineSeries data={ [ { x:0   ,   y: 100 } ] } color="#000000" />

                            <LineSeries data={cloudData} color="#C0C5C4"/>
                            <LineSeries data={chanceData} color="#3358b5"/>
                        </XYPlot>
                    </div>

                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: tempBottom } ] } color="#000000" />
                            <LineSeries data={ [ { x:0   ,   y: tempTop } ] } color="#000000" />
                            <LineSeries data={feelData} color="#FF7420"/>
                            <LineSeries data={tempData} color="#F71A2B"/>
                        </XYPlot>
                    </div>

                </div>
                <div>
                    <XYPlot height={25} width= {1440} margin={{left: 5, right: 5, top: 1, bottom: 1}} stackBy="x">
                        <HorizontalBarSeries data={ [ { x: preRisePer   ,   y: 1 } ] } color="#1D1D5B" />
                        <HorizontalBarSeries data={ [ { x: postRiseNet  ,   y: 1 } ] } color="#fe9b78" />
                        <HorizontalBarSeries data={ [ { x: preSetNet    ,   y: 1 } ] } color="#BAD9E7" />
                        <HorizontalBarSeries data={ [ { x: postSetNet   ,   y: 1 } ] } color="#fe9b78" />
                        <HorizontalBarSeries data={ [ { x: remainderNet ,   y: 1 } ] } color="#1D1D5B" />
                    </XYPlot> 
                </div>
            </div>
        );
    }
}