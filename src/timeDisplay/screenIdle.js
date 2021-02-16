import React, { Component } from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryLine } from 'victory';


var hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // containing half day hours to



class Idle extends Component {
    constructor(props) {
        super(props);
        this.state = this.initClock();
    }
    initClock = () => {
        const date = new Date();
        return {
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        }
    }
    setupInterval = () => {
        this.interval = setInterval(() => {
            const date = new Date();
            this.setState({
                minutes: date.getMinutes(),
                hours: date.getHours()
            })
        }, 1000);
    }
    render() {
        const { minutes, hours } = this.props.useCustomTime ? this.props : this.state;
        return (
            <div>
                <VictoryChart polar
                    startAngle={90}
                    endAngle={450}
                    standalone={true}
                    theme={VictoryTheme.material}
                    domain={{ y: [0, 100], x: [12, 0] }}>
                    <VictoryPolarAxis dependentAxis
                        style={{
                            axis: { stroke: "white" }
                        }}
                        tickFormat={() => ""}
                    />
                    <VictoryPolarAxis
                        style={{
                            grid: { stroke: 'none' },
                            axis: { fill: 'black' }, // inside polar graph
                            ticks: { stroke: 'white', strokeWidth: '5', opacity: '40%' }, // outside tick
                            tickLabels: { fill: 'white', opacity: '50%' } // numbers (time) 
                        }}
                        tickValues={hour.map(hour => hour)} // array of hours and minutes
                        tickFormat={hour.map(filteredTime => filteredTime + ':00')} // filter to only include hours on the labels
                    />
                    <VictoryLine
                        domainPadding={{ y: [0, 50] }}
                        style={{
                            data: {
                                stroke: "white",
                                strokeWidth: 2.5,
                                opacity: "80%"
                            }
                        }}
                        x={() => hours + (minutes / 120)}
                    />
                    <VictoryLine
                        domainPadding={{ y: [0, 15] }}
                        style={{
                            data: {
                                stroke: "white",
                                strokeWidth: 1.5,
                                opacity: "60%"
                            }
                        }}
                        x={() => (hours * 12) + (minutes / 5)} // x values are 0-12, this splis the length of an hour into 5 minutes
                    />
                </VictoryChart>
            </div>
        );
    };
}


export default Idle;



