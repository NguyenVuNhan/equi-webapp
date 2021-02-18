import React, { Component } from 'react';
import { VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryLine } from 'victory';

var hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // containing half day hours to

class Idle extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            minutes: date.getMinutes(),
            hours: date.getHours() > 12 ? date.getHours() - 12 : date.getHours() // sets format to 12 hh
        }
    }
    //sets interval to 1000 ms(1 sec)
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }
    // clears interval ( 1001ms would not let the timer tick again)
    componentWillUnmount() {
        clearInterval(setInterval(() => this.tick(), 1000));
    }
    // tick updates the minute and hour
    tick() {
        const date = new Date();
        this.setState({
            hours: date.getHours(),
            minutes: date.getMinutes(),
        })
    }

    render() {
        return (
            <div id="root">
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
                        x={() => this.state.hours + (this.state.minutes / 120)}
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
                        x={() => (this.state.hours * 12) + (this.state.minutes / 5)} // x values are 0-12, this splis the length of an hour into 5 minutes
                    />
                </VictoryChart>
            </div>
        );
    };
}

export default Idle;



