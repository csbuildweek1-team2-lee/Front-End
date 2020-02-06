import React, { useEffect, useState} from "react";
// import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import Dashboard from "../components/Dashboard";
// import mock_rooms from "../data/data"
import all_rooms from "../data/dataExtended"
// import Char from "../components/Move"

const Map=(props)=>{
    const [rooms, setRooms] = useState([])
    // const [roomID, setRoomID] = useState("")
    // const [players, setPlayers] = useState("")
    // const [dir, setDir] = useState("")
    // const [move, setMove] = useState("")
    //above may just need to be an object containing all this info

    //0: GRASS path
    //1: ROOM
    //2: dirt/trees
    //3: tree
    //

    const tiles = [
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],

    ]


    useEffect(()=>{
        // axiosWithAuth().get(
        //     'https://lambda-mud-test.herokuapp.com/api/adv/rooms'
        //     )
        //     .then(res => {
        //         // console.log("res.data: ", res.data);  
        //         //have to use JSON.parse when reading from the test DB      
        //         setRooms(JSON.parse(res.data.rooms));
        //         console.log("json parse", JSON.parse(res.data.rooms));
                
        //     })
        //     .catch (err => {
        //         console.log(err.message)
        //     })
    },[])

const grass= "client/src/assets/GrassTile.png"

function getTileSprite(type){
    switch(type){
        case 0:
            return "pathWEThin"
        case 1:
            return "house"
        case 2:
            return "canal"
        case 3:
            return "pathNSZ"
        case 4:
            return "canalWCap"
        case 5:
            return "canalECap"
        case 6:
            return "solidWater"
                        
                }
}
  



    return (
        <>
        {tiles.map((row, i)=>(
            row.map((tile, i)=>(
                
                <div
                className={`tile ${getTileSprite(tile)}`}
                />
                
            ))
            ))
        }

            
        </>
    )
}

export default Map;