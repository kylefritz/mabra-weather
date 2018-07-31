import React, { Component }                                         from 'react'        ;
import {hours, emojiKey}                                            from './App'        ;


export class HourlyText extends Component {

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

