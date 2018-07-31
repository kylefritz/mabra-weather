import React, { Component } from 'react'    ;
import {emojiKey}           from './App'    ;



export class PreLabels extends Component {
    render() {
        return (
            <div className="preLabels">
                <div className="summary">{/* spacer */}</div>
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

export class PreDaily extends Component {

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

export class RaceDaily extends Component {

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
