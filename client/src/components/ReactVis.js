import React, { Component, useEffect, useState } from 'react';
<<<<<<< HEAD
// import { FlexibleXYPlot, MarkSeries, LineSeries } from "react-vis";
// import { axiosWithAuth } from "../utils/axiosWithAuth";
import 'react-vis/dist/style.css';
=======
import { FlexibleXYPlot, MarkSeries, LineSeries } from "react-vis";
import { axiosWithAuth } from "../utils/axiosWithAuth";
>>>>>>> ea1909bbeef52022b372afe485b5e39e2c61f402
import mock_room_data from "../data/data.js";
import all_rooms from "../data/dataExtended"


import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    CustomSVGSeries
  } from 'react-vis';

  function ReactVis(props) {  
      
    const [mockRoomCoordinates, setMockRoomCoordinates] = useState([]);

    const [mockRoomData, setMockRoomData] = useState([]);

    const mapXYCoordinates = [];

    useEffect( () => {
       
      setMockRoomCoordinates(            
            mock_room_data.rooms.map((room) => ({
                pk: room.pk,
                x: room.fields.x,
                y: room.fields.y
              }))
            )  
            
      setMockRoomData(            
        mock_room_data.rooms.map((room) => ({
            pk: room.pk,
            title: room.fields.title,
            x: room.fields.x,
            y: room.fields.y
          }))
        )       

    }, [])
      
    
    mockRoomData.map(mock_room => {
        console.log("mock room data", mock_room);    

    })    
      

    return (
      <div>

        <XYPlot margin={50} xDomain={[0, 10]} yDomain={[0, 10]} width={500} height={500}> 
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries strokeWidth={1}/>
        <XAxis />
        <YAxis/>

        {
          mockRoomCoordinates.map(mock_room => {
            //console.log("mockRoomData", mockRoomData)
            //console.log("mock room data", mock_room);
            mapXYCoordinates.push(mock_room);    
          })
        }
                
        <CustomSVGSeries
          current = {1}
          highlight="#1b00ff"
          animation
          style={{stroke: 'red', fill: 'orange'}}
          className="custom-marking"
          customComponent={(row, positionInPixels) => {
            return (
              <g className="inner-inner-component">
                <circle cx="0" cy="0" r={row.size || 10} fill="green" />
                <text x={0} y={0}>                 
                  <tspan x="0" y="1em">{`y: ${row.y}`}</tspan>
                  <tspan x="0" y="0">{`x: ${row.x}`}</tspan>
                </text>
              </g>
            );
          }}
          
          data = {mapXYCoordinates}
          
          /*data={[            
            {x: 5, y: 5, size: 20, style: {stroke: 'red', fill: 'orange'}}, //room 1
            {x: 5, y: 4, size: 3}, //room 2
            {x: 5, y: 3}, //room 3
            {x: 6, y: 4}, //room 4
            {x: 6, y: 5}, //room 5           
          ]}*/
        />     

      </XYPlot>

      

    </div>
    );
  }

export default ReactVis;