import React, { Component }                                         from 'react'        ;
import {hours, emojiKey}                                            from './App'        ;
import {XYPlot, VerticalBarSeries, LineSeries, HorizontalBarSeries, LabelSeries, MarkSeries} from 'react-vis'    ;
import './vis.css' ;

export class HourlyGraph extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayTime     :   []                                                      ,
            displayIcon     :   [emojiKey[this.props.weather[3].daily.data[0].icon]]    ,
            displayFeel     :   []                                                      ,
            displayTemp     :   []                                                      ,
            displayWind     :   []                                                      ,
            displayCloud    :   []                                                      ,
            displayChance   :   []                                                      ,
            displayAmount   :   []                                                      ,
            displayRise     :   []                                                      ,
            displayLight    :   []                                                      ,
            displaySet      :   []                                                      ,
        };
        this.nearestXHandler    = this.nearestXHandler.bind(this)   ;
    }

    nearestXHandler(value, {index}) {

        let time    =     ( index === 0  ) ?   ( "12a"      ) 
                        : ( index < 13 )   ?   ( index        + "a" )      
                                           : ( ( index - 12 ) + "p" ) ;

        const day = this.props.weather[3]

        let icon                =        emojiKey[day.hourly.data[index].icon]                                                  ;
        let feel                =                 day.hourly.data[index].apparentTemperature.toFixed(0)               +   "°"   ;
        let temp                =                 day.hourly.data[index].temperature.toFixed(0)                       +   "°"   ;
        let wind                =                 day.hourly.data[index].windSpeed.toFixed(0)                         +   "mph" ;
        let cloud               =               ( day.hourly.data[index].cloudCover           * 100   ).toFixed(0)    +   "%"   ;  
        let chance              =               ( day.hourly.data[index].precipProbability    * 100   ).toFixed(0)    +   "%"   ;
        let amount              =               ( day.hourly.data[index].precipIntensity      * 25.4  ).toFixed(1)    +   "mm"  ;
        const sunriseHour       =    ( new Date ( day.daily.data[0].sunriseTime * 1000 ) ).getHours()                           ;
        const sunsetHourFixed   =    ( new Date ( day.daily.data[0].sunsetTime  * 1000 ) ).getHours() - 12                      ;
        const sunriseMin        =    ( new Date ( day.daily.data[0].sunriseTime * 1000 ) ).getMinutes()                         ;
        const sunsetMin         =    ( new Date ( day.daily.data[0].sunsetTime  * 1000 ) ).getMinutes()                         ;
        const sunriseMinFixed   =    sunriseMin < 10 ? "0" + sunriseMin : sunriseMin                                            ;
        const sunsetMinFixed    =    sunsetMin  < 10 ? "0" + sunsetMin  : sunsetMin                                             ;
        let rise                =    sunriseHour     + ":" + sunriseMinFixed + "a"                                              ;
        let set                 =    sunsetHourFixed + ":" + sunsetMinFixed  + "p"                                              ;
        const sunLight          =   ( 12 + sunsetHourFixed - sunriseHour ) * 60 + sunsetMin - sunriseMin                        ;
        const lightHour         =   Math.floor( sunLight / 60 )                                                                 ;
        const lightMin          =   sunLight - 60 * lightHour                                                                   ;
        const light             =   lightHour + "h " + lightMin + "m"                                                           ;

        this.setState({ 
            displayIcon     : [icon]    ,
            displayTime     : [time]    ,
            displayFeel     : [feel]    ,
            displayTemp     : [temp]    ,
            displayWind     : [wind]    ,
            displayCloud    : [cloud]   ,
            displayChance   : [chance]  ,
            displayAmount   : [amount]  ,
            displayRise     : [rise]    ,
            displayLight    : [light]   ,
            displaySet      : [set]     ,
        });

    }

    render() {

            let feelData            =   []  ;
            let tempData            =   []  ;
            let windData            =   []  ;
            let cloudData           =   []  ;
            let chanceData          =   []  ;
            let precipMmData        =   []  ;

            const hourly            = this.props.weather[3].hourly.data ;                 

            hours.map( (hour, i)    => feelData.push(       {   x: i   ,  y:   hourly[i].apparentTemperature.toFixed(0)         } ) )
            hours.map( (hour, i)    => tempData.push(       {   x: i   ,  y:   hourly[i].temperature.toFixed(0)                 } ) )
            hours.map( (hour, i)    => windData.push(       {   x: i   ,  y:   hourly[i].windSpeed.toFixed(0)                   } ) )
            hours.map( (hour, i)    => cloudData.push(      {   x: i   ,  y: ( hourly[i].cloudCover * 100  ).toFixed(0)         } ) )
            hours.map( (hour, i)    => chanceData.push(     {   x: i   ,  y: ( hourly[i].precipProbability * 100  ).toFixed(0)  } ) )
            hours.map( (hour, i)    => precipMmData.push(   {   x: i   ,  y: ( hourly[i].precipIntensity * 25.4  ).toFixed(1)   } ) )

            let tempMinY            =   Math.min.apply(Math, tempData.map(function(q) { return q.y; })) ;
            let tempMaxY            =   Math.max.apply(Math, tempData.map(function(q) { return q.y; })) ;   
            let tempMinX            =   tempData.findIndex(q => q.y===tempMinY.toString());
            let tempMaxX            =   tempData.findIndex(q => q.y===tempMaxY.toString());
            let tempMinMax          =   [ { x: tempMinX , y: tempMinY } , 
                                          { x: tempMaxX , y: tempMaxY }   ]

            let feelMinY            =   Math.min.apply(Math, feelData.map(function(q) { return q.y; })) ;
            let feelMaxY            =   Math.max.apply(Math, feelData.map(function(q) { return q.y; })) ;   
            let feelMinX            =   feelData.findIndex(q => q.y===feelMinY.toString());
            let feelMaxX            =   feelData.findIndex(q => q.y===feelMaxY.toString());
            let feelMinMax          =   [ { x: feelMinX , y: feelMinY } , 
                                          { x: feelMaxX , y: feelMaxY }   ]

            let windMinY            =   Math.min.apply(Math, windData.map(function(q) { return q.y; })) ;
            let windMaxY            =   Math.max.apply(Math, windData.map(function(q) { return q.y; })) ;   
            let windMinX            =   windData.findIndex(q => q.y===windMinY.toString());
            let windMaxX            =   windData.findIndex(q => q.y===windMaxY.toString());
            let windMinMax          =   [ { x: windMinX , y: windMinY } , 
                                          { x: windMaxX , y: windMaxY }   ]

            let cloudMinY            =   Math.min.apply(Math, cloudData.map(function(q) { return q.y; })) ;
            let cloudMaxY            =   Math.max.apply(Math, cloudData.map(function(q) { return q.y; })) ;   
            let cloudMinX            =   cloudData.findIndex(q => q.y===cloudMinY.toString());
            let cloudMaxX            =   cloudData.findIndex(q => q.y===cloudMaxY.toString());
            let cloudMinMax          =   [ { x: cloudMinX , y: cloudMinY } , 
                                           { x: cloudMaxX , y: cloudMaxY }   ]

            let chanceMinY            =   Math.min.apply(Math, chanceData.map(function(q) { return q.y; })) ;
            let chanceMaxY            =   Math.max.apply(Math, chanceData.map(function(q) { return q.y; })) ;   
            let chanceMinX            =   chanceData.findIndex(q => q.y===chanceMinY.toString());
            let chanceMaxX            =   chanceData.findIndex(q => q.y===chanceMaxY.toString());
            let chanceMinMax          =   [ { x: chanceMinX , y: chanceMinY } , 
                                            { x: chanceMaxX , y: chanceMaxY }   ]

            let precipMmMinY            =   Math.min.apply(Math, precipMmData.map(function(q) { return q.y; })) ;
            let precipMmMaxY            =   Math.max.apply(Math, precipMmData.map(function(q) { return q.y; })) ;   
            let precipMmMinX            =   precipMmData.findIndex(q => q.y===precipMmMinY.toString());
            let precipMmMaxX            =   precipMmData.findIndex(q => q.y===precipMmMaxY.toString());
            let precipMmMinMax          =   [ { x: precipMmMinX , y: precipMmMinY } , 
                                            { x: precipMmMaxX , y: precipMmMaxY }   ]


            let tempMinYDomain       =   tempMinY - 5;
            let tempMaxYDomain       =   tempMaxY + 5;

            const sunriseHour       =   ( new Date ( this.props.weather[3].daily.data[0].sunriseTime * 1000 ) ).getHours()      ;
            const sunsetHour        =   ( new Date ( this.props.weather[3].daily.data[0].sunsetTime  * 1000 ) ).getHours()      ;    
            const sunriseMin        =   ( new Date ( this.props.weather[3].daily.data[0].sunriseTime * 1000 ) ).getMinutes()    ;
            const sunsetMin         =   ( new Date ( this.props.weather[3].daily.data[0].sunsetTime  * 1000 ) ).getMinutes()    ;
        
            const risePer           =   ( 60 * sunriseHour + sunriseMin ) / ( 60 * 24 ) ;
            const setPer            =   ( 60 * sunsetHour  + sunsetMin  ) / ( 60 * 24 ) ;
        
            const sunChangetime     =   0.2 / 24    ;
        
            const preRisePer        =   risePer - sunChangetime     ;
            const postRisePer       =   risePer + sunChangetime     ;
            const preSetPer         =   setPer - sunChangetime      ;
            const postSetPer        =   setPer + sunChangetime      ;
        
            const postRiseNet       =   postRisePer -   preRisePer  ;
            const preSetNet         =   preSetPer   -   postRisePer ;
            const postSetNet        =   postSetPer  -   preSetPer   ;
            const remainderNet      =   1           -   postSetPer  ;

            




        return (

            <div>
                <div className="outer">
                    <div className="graphSpacer">{/* spacer */}</div>
                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 0, right: 0, top: 5, bottom: 1}}>
                            <LineSeries         data={ [ { x:0   ,   y: 0 } ] } color="#000000"                                 />
                            <LineSeries         data={ [ { x:0   ,   y: 1 } ] } color="#000000"                                 />
                            <VerticalBarSeries  data={precipMmData}             color="#B4DFE4"                                 />
                            <MarkSeries         data={precipMmMinMax}           color="#B4DFE4" size="5"    stroke="#FFFFFF"    />          
                        </XYPlot>
                    </div>
                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: 0  } ] }    color="#000000"                                 />
                            <LineSeries data={ [ { x:0   ,   y: 20 } ] }    color="#000000"                                 />
                            <LineSeries data={windData}                     color="#AA4A92"                                 />
                            <MarkSeries data={windMinMax}                   color="#AA4A92" size="5"    stroke="#FFFFFF"    />          
                        </XYPlot>
                    </div>
                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries data={ [ { x:0   ,   y: 0   } ] }   color="#000000"                                 />
                            <LineSeries data={ [ { x:0   ,   y: 100 } ] }   color="#000000"                                 />
                            <LineSeries data={cloudData}                    color="#C0C5C4"                                 />
                            <LineSeries data={chanceData}                   color="#3358b5"                                 />
                            <MarkSeries data={cloudMinMax}                  color="#C0C5C4" size="5"    stroke="#FFFFFF"    />   
                            <MarkSeries data={chanceMinMax}                 color="#3358b5" size="5"    stroke="#FFFFFF"    />          
                        </XYPlot>
                    </div>
                    <div className="stack">
                        <XYPlot height={250} width= {1440} margin={{left: 30, right: 30, top: 5, bottom: 1}}>
                            <LineSeries     data={ [ { x:0   ,   y: tempMinYDomain } ] }    color="#000000"                                     />
                            <LineSeries     data={ [ { x:0   ,   y: tempMaxYDomain } ] }    color="#000000"                                     />
                            <LineSeries     data={feelData}                                 color="#FF7420"                                     />
                            <LineSeries     data={tempData}                                 color="#F71A2B" onNearestX={this.nearestXHandler}   />
                            <MarkSeries     data={feelMinMax}                               color="#FF7420" size="5"    stroke="#FFFFFF"        />          
                            <MarkSeries     data={tempMinMax}                               color="#F71A2B" size="5"    stroke="#FFFFFF"        />
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
                <div className="legend">
                    <span className="displayTime"           >{this.state.displayTime}</                 span>
                    <span className="displayIcon"           >{this.state.displayIcon}</                 span>
                    <span className="displayFeel    feel"   >Feel {this.state.displayFeel}</            span>
                    <span className="displayTemp    temp"   >Temp {this.state.displayTemp}</            span>
                    <span className="displayWind    wind"   >Wind {this.state.displayWind}</            span>
                    <span className="displayCloud   cloud"  >Cloud Cover {this.state.displayCloud}</    span>
                    <span className="displayChance  chance" >Precip Chance {this.state.displayChance}</ span>
                    <span className="displayAmount  amount" >Precip Amount {this.state.displayAmount}</ span>
                    <span className="displayRise    sun"    >Sunrise {this.state.displayRise}</         span>
                    <span className="displayLight   light"  >Daylight {this.state.displayLight}</       span>
                    <span className="displaySet     sun"    >Sunset {this.state.displaySet}</           span>
                </div>
            </div>
        );
    }
}


