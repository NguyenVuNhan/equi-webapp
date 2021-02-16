import React, { Component } from 'react';
import { VictoryLabel, VictoryChart, VictoryPolarAxis, VictoryArea, VictoryTheme, VictoryLine, Background, VictoryScatter, Circle, ClipPath } from 'victory';

class DataDisplayed extends Component {
    render() {
        return (
            <div>
                <VictoryChart
                    polar={true}
                    startAngle={90}
                    endAngle={450}
                    innerRadius={50}
                    theme={VictoryTheme.material}
                    domain={{ y: [0, 100], x: [25, 0] }}>
                    <VictoryPolarAxis dependentAxis
                        style={{
                            axis: { stroke: "white" }
                        }}
                        tickFormat={() => ""}
                    />
                    <VictoryPolarAxis
                        style={{
                            grid: { stroke: 'white', opacity: '20%' },
                            axis: { fill: 'black' }, // inside polar graph
                            ticks: { stroke: 'white', strokeWidth: '5', opacity: '40%' }, // outside tick
                            tickLabels: { fill: 'white', opacity: '50%' } // numbers (time) 
                        }}
                        tickValues={projectedEnergy.map(d => d.x)}
                        tickFormat={projectedEnergy.map((d) => d.x + ':00')}
                    />
                    {/*Under is the area covered of the first array */}
                    <VictoryLine data={currentEnergy}
                        standalone={false}
                        style={{
                            data: {
                                stroke: "#f2ef49",
                                fill: "#f2ef49",
                                opacity: "35%"
                            }
                        }}
                    />
                    {/*Under is the area covered of the second array */}
                    <VictoryLine data={projectedEnergy}
                        standalone={false}
                        style={{
                            data: {
                                stroke: "#00f2ff",
                                fill: "#00f2ff",
                                opacity: "30%"
                            }
                        }} />
                    {/*Under is the red line that indicates the point in the line 
          domain padding y= (yMaxValue - yValue of deisired point)*/}
                    <VictoryLine
                        domainPadding={{ y: [0, 28] }}
                        style={{
                            data: {
                                stroke: "red",
                                strokeWidth: 1.5,
                                opacity: "50%"
                            }
                        }}
                        x={() => 19}
                    />
                    {/*Under is the red dot to indicate a point in the line and the label*/}
                    <VictoryScatter
                        standalone={false}
                        style={{
                            data: {
                                stroke: "red",
                                strokeWidth: 2,
                                fill: "red"
                            },
                            labels: {
                                fill: "red",
                                fontSize: 8
                            }
                        }}
                        labels={["Jesse"]}
                        x={() => 19}
                        y={() => 72}
                        labelComponent={<VictoryLabel
                            textAnchor="end" />}
                    />
                </VictoryChart>
            </div>
        );
    };
}

const currentEnergy = [
    { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 20 },
    { x: 4, y: 35 }, { x: 5, y: 30 }, { x: 6, y: 49 },
    { x: 7, y: 45 }, { x: 8, y: 60 }, { x: 9, y: 70 },
    { x: 10, y: 45 }, { x: 11, y: 50 }, { x: 12, y: 60 },
    { x: 13, y: 40 }, { x: 14, y: 35 }, { x: 15, y: 40 },
    { x: 16, y: 45 }, { x: 17, y: 55 }, { x: 18, y: 65 },
    { x: 19, y: 70 }, { x: 20, y: 55 }, { x: 21, y: 45 },
    { x: 22, y: 35 }, { x: 23, y: 30 }, { x: 24, y: 35 }
];

const projectedEnergy = [
    { x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 },
    { x: 4, y: 50 }, { x: 5, y: 60 }, { x: 6, y: 70 },
    { x: 7, y: 80 }, { x: 8, y: 70 }, { x: 9, y: 60 },
    { x: 10, y: 50 }, { x: 11, y: 40 }, { x: 12, y: 30 },
    { x: 13, y: 20 }, { x: 14, y: 10 }, { x: 15, y: 20 },
    { x: 16, y: 30 }, { x: 17, y: 40 }, { x: 18, y: 50 },
    { x: 19, y: 60 }, { x: 20, y: 70 }, { x: 21, y: 60 },
    { x: 22, y: 50 }, { x: 23, y: 40 }, { x: 24, y: 20 }
];



export default DataDisplayed;



