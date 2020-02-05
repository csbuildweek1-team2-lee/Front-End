import React, { useEffect, useState} from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Dashboard from "../components/Dashboard";
import mock_rooms from "../data/data"
import all_rooms from "../data/dataExtended"
// import Char from "../components/Move"

const Map=(props)=>{
    const [rooms, setRooms] = useState([])
    const [roomID, setRoomID] = useState("")
    const [players, setPlayers] = useState("")
    const [dir, setDir] = useState("")
    const [move, setMove] = useState("")
    //above may just need to be an object containing all this info

    const [tiles, setTiles] =useState({
        tiles: [
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,0,0,1,1,1,1,
            1,1,1,1,0,0,1,1,1,1,
            1,1,1,1,0,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1

        ]
    }
    )


    useEffect(()=>{
        axiosWithAuth().get(
            'https://lambda-mud-test.herokuapp.com/api/adv/rooms'
            )
            .then(res => {
                console.log("res.data: ", res.data);  
                //have to use JSON.parse when reading from the test DB      
                setRooms(JSON.parse(res.data.rooms));
                console.log("json parse", JSON.parse(res.data.rooms));
                
            })
            .catch (err => {
                console.log(err.message)
            })
    },[])

    console.log(all_rooms)

    return (
        <>{
            
            all_rooms.map(room=>{
                return
            })

            }
</>
    )
}

export default Map;