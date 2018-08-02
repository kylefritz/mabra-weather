import React, { Component } from 'react'    ;
import {Header}             from './header' ;
import {Row}                from './row'    ;
import {Footer}             from './footer' ;

const races =           [ 
                        { name: "Garage Finale"     ,   lat: 38.863416  ,   long: -77.050199    ,   year:   2018    ,   month:   3  ,   date:    28 ,   abbr:   "gr"    ,   }   ,
                        { name: "Hilly Billy"       ,   lat: 39.713268  ,   long: -80.115311    ,   year:   2018    ,   month:   6  ,   date:    23 ,   abbr:   "hb"    ,   }   ,
                        { name: "Granogue Madison"  ,   lat: 39.821025  ,   long: -75.592505    ,   year:   2018    ,   month:   9  ,   date:    1  ,   abbr:   "gm"    ,   }   ,  
                        { name: "Granogue"          ,   lat: 39.821025  ,   long: -75.592505    ,   year:   2018    ,   month:   9  ,   date:    2  ,   abbr:   "gn"    ,   }   , 
                        { name: "Luray"             ,   lat: 38.666479  ,   long: -78.483094    ,   year:   2018    ,   month:   9  ,   date:    8  ,   abbr:   "lr"    ,   }   ,
                        { name: "Hub Labels"        ,   lat: 39.614611  ,   long: -77.735861    ,   year:   2018    ,   month:   9  ,   date:    9  ,   abbr:   "hl"    ,   }   ,
                        { name: "Sykelo Day 1"      ,   lat: 39.377946  ,   long: -76.961118    ,   year:   2018    ,   month:   9  ,   date:   22  ,   abbr:   "sd1"   ,   }   ,
                        { name: "Sykelo Day 2"      ,   lat: 39.377946  ,   long: -76.961118    ,   year:   2018    ,   month:   9  ,   date:   23  ,   abbr:   "sd2"   ,   }   ,
                        { name: "Hyattsville"       ,   lat: 38.952669  ,   long: -76.950693    ,   year:   2018    ,   month:   9  ,   date:   30  ,   abbr:   "hv"    ,   }   ,
                        { name: "Charm City Day 1"  ,   lat: 39.320746  ,   long: -76.643074    ,   year:   2018    ,   month:  10  ,   date:    6  ,   abbr:   "ccd1"  ,   }   ,
                        { name: "Charm City Day 2"  ,   lat: 39.320746  ,   long: -76.643074    ,   year:   2018    ,   month:  10  ,   date:    7  ,   abbr:   "ccd2"  ,   }   ,
                        { name: "AA"                ,   lat: 38.919799  ,   long: -76.520615    ,   year:   2018    ,   month:  10  ,   date:   13  ,   abbr:   "aa"    ,   }   ,
                        { name: "Falkorburg"        ,   lat: 39.305103  ,   long: -76.962482    ,   year:   2018    ,   month:  10  ,   date:   14  ,   abbr:   "fb"    ,   }   ,
                        { name: "DC Day 1"          ,   lat: 38.938867  ,   long: -77.016236    ,   year:   2018    ,   month:  10  ,   date:   20  ,   abbr:   "dcd1"  ,   }   ,
                        { name: "DC Day 2"          ,   lat: 38.938867  ,   long: -77.016236    ,   year:   2018    ,   month:  10  ,   date:   21  ,   abbr:   "dcd2"  ,   }   ,
                        { name: "Biketoberfest"     ,   lat: 39.305103  ,   long: -76.962482    ,   year:   2018    ,   month:  10  ,   date:   27  ,   abbr:   "bt"    ,   }   ,
                        { name: "Tacchino"          ,   lat: 38.974405  ,   long: -77.743431    ,   year:   2018    ,   month:  10  ,   date:   28  ,   abbr:   "tc"    ,   }   ,
                        { name: "Red Shedman"       ,   lat: 39.427359  ,   long: -77.190440    ,   year:   2018    ,   month:  11  ,   date:    3  ,   abbr:   "rs"    ,   }   ,
                        { name: "Ed Sander"         ,   lat: 39.294005  ,   long: -77.433421    ,   year:   2018    ,   month:  11  ,   date:    4  ,   abbr:   "es"    ,   }   ,
                        { name: "Fair Hill"         ,   lat: 39.688030  ,   long: -75.840252    ,   year:   2018    ,   month:  11  ,   date:   10  ,   abbr:   "rh"    ,   }   ,
                        { name: "Rockburn"          ,   lat: 39.215391  ,   long: -76.770533    ,   year:   2018    ,   month:  11  ,   date:   11  ,   abbr:   "rb"    ,   }   ,
                        { name: "South Germantown"  ,   lat: 39.149671  ,   long: -77.310980    ,   year:   2018    ,   month:  11  ,   date:   17  ,   abbr:   "sg"    ,   }   ,
                        { name: "Bikenetic"         ,   lat: 38.828021  ,   long: -77.665942    ,   year:   2018    ,   month:  11  ,   date:   18  ,   abbr:   "bn"    ,   }   ,
                        { name: "Frosty"            ,   lat: 39.503193  ,   long: -76.685674    ,   year:   2018    ,   month:  12  ,   date:    1  ,   abbr:   "ft"    ,   }   ,
                        { name: "Cap"               ,   lat: 38.965430  ,   long: -77.316384    ,   year:   2018    ,   month:  12  ,   date:    2  ,   abbr:   "cc"    ,   }   ,
                        { name: "Nats Day 1"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   11  ,   abbr:   "nd1"   ,   }   ,
                        { name: "Nats Day 2"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   12  ,   abbr:   "nd2"   ,   }   ,                                                                                            
                        { name: "Nats Day 3"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   13  ,   abbr:   "nd3"   ,   }   ,                                                                                            
                        { name: "Nats Day 4"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   14  ,   abbr:   "nd4"   ,   }   ,                                                                                            
                        { name: "Nats Day 5"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   15  ,   abbr:   "nd5"   ,   }   ,                                                                                            
                        { name: "Nats Day 6"        ,   lat: 38.209061  ,   long: -85.705896    ,   year:   2018    ,   month:  12  ,   date:   16  ,   abbr:   "nd6"   ,   }   ,                                                                                                                                                               
                        ];

export const hours = [
  "12a",
  "1a",
  "2a",
  "3a",
  "4a",
  "5a",
  "6a",
  "7a",
  "8a",
  "9a",
  "10a",
  "11a",
  "12p",
  "1p",
  "2p",
  "3p",
  "4p",
  "5p",
  "6p",
  "7p",
  "8p",
  "9p",
  "10p",
  "11p",
];

export const   emojiKey    =   {   
                        "clear-day"             :   "☀️"     ,   
                        "clear-night"           :   "☀️"     ,   
                        "rain"                  :   "💧"    ,  
                        "snow"                  :   "❄️"     ,   
                        "sleet"                 :   "❄️"     ,   
                        "hail"                  :   "❄️"     ,   
                        "wind"                  :   "🚩"    ,  
                        "fog"                   :   "🌫"    ,  
                        "cloudy"                :   "☁️"     ,   
                        "partly-cloudy-day"     :   "🌤"    ,  
                        "partly-cloudy-night"   :   "🌤"    ,  
                        "thunderstorm"          :   "⚡"     ,   
                        "tornado"               :   "🌪"    ,  
                        "other"                 :   "❗"     ,   
                        };

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                { races.map( (race, i) =>
                    <Row  
                        key     = { i }
                        {...race}
                    />
                ) }
                <Footer />
            </div>
        );
    }
}

export default App;
