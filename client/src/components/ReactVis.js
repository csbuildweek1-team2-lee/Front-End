import React, { Component, useEffect, useState } from 'react';
import { FlexibleXYPlot, MarkSeries, LineSeries } from "react-vis";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import 'react-vis/dist/style.css';
import mock_room_data from "../data/data.js";


import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    CustomSVGSeries
  } from 'react-vis';

  function ReactVis(props) {  
      
    const [mockRoomData, setMockRoomData] = useState([]);

    const mapXYCoordinates = [];

    useEffect( () => {

       
        setMockRoomData([
            
            mock_room_data.rooms.map((room) => ({
                pk: room.pk,
                x: room.fields.x,
                y: room.fields.y
              }))
            ])
        

    }, [])
      
    
    mockRoomData.map(mock_room => {

        console.log("mock room data", mock_room);
        //mapCoordinates.push(mock_room);

    })
    
   

    return (
        <XYPlot xDomain={[0, 10]} yDomain={[0, 10]} width={500} height={500}> 
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries />
        <XAxis />
        <YAxis/>

        {
          mockRoomData.map(mock_room => {
            console.log("mockRoomData", mockRoomData)
            console.log("mock room data 2", mock_room);
            mapXYCoordinates.push(mock_room);
    
        })
        }

        {/*{
            for (let coord in mockRoomData){
            
            }
        }*/}
         
        
        <CustomSVGSeries
          className="custom-marking"
          customComponent={(row, positionInPixels) => {
            return (
              <g className="inner-inner-component">
                <circle cx="0" cy="0" r={row.size || 10} fill="green" />
                <text x={0} y={0}>
                  <tspan x="0" y="0">{`x: ${positionInPixels.x}`}</tspan>
                  <tspan x="0" y="1em">{`y: ${positionInPixels.y}`}</tspan>
                </text>
              </g>
            );
          }}

          
          /*data = {[
            mapXYCoordinates.forEach(coord => {
              console.log("coord", coord)
              return coord.pop()
            })
          ]}*/
          
          data={[
            //{pk: 1, x: 1, y: 10, size: 3},
            {x: 5, y: 5, size: 20, style: {stroke: 'red', fill: 'orange'}}, //room 1
            {x: 5, y: 4}, //room 2
            {x: 5, y: 3}, //room 3
            {x: 6, y: 4}, //room 4
            {x: 6, y: 5}, //room 5
            //{x: 1.5, y: 0},
            //{x: 1.5, y: 0},
            //{x: 1, y: 0},
            //{x: 1.5, y: 0},
            //{x: 10, y: 5}, 
          ]}
        />
      </XYPlot>
    );
  }

export default ReactVis;