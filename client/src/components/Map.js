import React, { useEffect, useState} from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Dashboard from "../components/Dashboard";

const Map=()=>{
    const [room, setRoom] = useState([])
    const [roomID, setRoomID] = useState("")
    const [players, setPlayers] = useState("")
    const [dir, setDir] = useState("")
    const [move, setMove] = useState("")
    //above may just need to be an object containing all this info

    const [tiles, setTiles] =useState({
        tiles: [
            2,2,2,2,2,2,2,2,2,2,2,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,1,1,1,1,1,1,1,1,1,1,2,
            2,2,2,2,2,3,2,2,2,2,2,2
        ]
    }
    )
    console.log(Dashboard)

    return (
        <>{
            tiles.tiles.map(tile =>{
                if(tile==1){
                return(
                <div className="grass"></div>)
                }
                if (tile==2) {
                return(<div className="wall"></div>)
                }
                else{
                    if(tile==3){
                        return(<div className="current">O</div>)
                    }
                }
            })
            }</>
    )
}

export default Map;