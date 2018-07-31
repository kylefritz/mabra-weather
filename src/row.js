import React, { Component }             from 'react'            ;
import {getAllWeather}                  from './api'            ;
import {PreLabels, PreDaily, RaceDaily} from './daily'          ;
import {HourlyText}                     from './hourlyText'     ;
import {HourlyGraph}                    from './hourlyGraph'    ;
import breg                             from './breg16.png'     ;
import goog                             from './goog16.png'     ;
import waze                             from './waze16.png'     ;
import rslt                             from './rslt16.png'     ;

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

            const today     =   new Date(Date.now())
            const raceDay   =   Date.parse( new Date ( this.state.weather[3].daily.data[0].time * 1000 ) )  ;
            const opacity   =   ( ( today - raceDay ) > ( 1 * 86400000 ) ) ? "past" : ""                                           ;

            const diffDays  =   Math.ceil( ( raceDay - today ) / 86400000 )
            const toGo      =     ( diffDays <   -729 ) ? Math.floor( diffDays / -365 ) +   " years ago"  
                                : ( diffDays <   -364 ) ?                                  "1 year ago" 
                                : ( diffDays <   -60  ) ? Math.floor( diffDays / -30.4 ) +  " months ago" 
                                : ( diffDays <   -34  ) ?                                  "1 month ago" 
                                : ( diffDays <   -13  ) ? Math.floor( diffDays / -7 ) +     " weeks ago" 
                                : ( diffDays <   -6   ) ?                                  "1 week ago" 
                                : ( diffDays <   -1   ) ? diffDays * -1 +                   " days ago" 
                                : ( diffDays === -1   ) ?                                    "Yesterday" 
                                : ( diffDays === 0    ) ?                                    "Today!" 
                                : ( diffDays === 1    ) ?                                    "Tomorrow!" 
                                : ( diffDays <   15   ) ? diffDays +                        " days" 
                                : ( diffDays <   203  ) ? Math.floor( diffDays / 7 ) +      " weeks" 
                                : ( diffDays <   365  ) ? Math.floor( diffDays / 30.4 ) +   " months" 
                                : ( diffDays <   729  ) ?                                  "1 year" 
                                :                         Math.floor( diffDays / 365 ) +    " years" 

            return (
                <div className={"flexBin " + opacity}> 
                    <Event 
                        name    =   {this.props.name}
                        weather =   {this.state.weather} 
                        lat     =   {this.props.lat}
                        long    =   {this.props.long}
                        toGo    =   {toGo}
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
                <a href={rsltUrl}><img src={rslt} /></a><br />
                <br />
                {this.props.toGo}      
            </div>
        );
    }
}
