import React, { Component } from 'react'    ;
import {hours}              from './App'    ;

export class Header extends Component {
    render() {
        return (
            <div className="flexBin topBar">
                <div className="corner">
                    {/* color block */}
                </div>
                <div className="event">
                    {/* position spacer */}
                </div>
                <div className="preLabels">
                    {/* position spacer */}
                </div>
                <div className="preDays fillHeadColor">
                    3 Days Before
                </div>
                <div className="preDays fillHeadColor">
                    2 Days Before
                </div>
                <div className="preDays fillHeadColor">
                    1 Day Before
                </div>
                <div className="raceDay fillHeadColor highlight">
                    Race Day
                </div>
                { hours.map( (hour, i) =>
                    <div 
                        className   = "hourly fillHeadColor" 
                        key         = { i }
                    >
                        {hour.label}
                        
                    </div>
                ) }
            </div>
        )
    }
}