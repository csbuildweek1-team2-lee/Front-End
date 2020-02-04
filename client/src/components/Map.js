import React, { useEffect, useState} from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Map = ()=>{
    const [room, setRoom] = useState([])
    const [roomID, setRoomID] = useState("")
    const [players, setPlayers] = useState("")
    const [dir, setDir] = useState("")
    const [move, setMove] = useState("")
    //above may just need to be an object containing all this info

    useEffect(() => {
		console.log("ue")
		
	}, []);


    return (
        <div></div>
    )
}