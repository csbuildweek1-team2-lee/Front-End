import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ReactVis from "./ReactVis.js";

function Dashboard(){

    const [rooms, setRooms] = useState([])
import Map from "../components/Map";

function Dashboard(){

    const [moveInfo, setMoveInfo] =useState({
        name: "",
        title: "",
        description: "",
        players: [],
        error_msg: ""
    })
    const [resetInfo, setResetInfo]=useState({
        
            name: "",
            title: "",
            description: "",
            players: [],
            error_msg: ""
        
    })


    useEffect(() => {
       
        axiosWithAuth().get(
            'https://lambda-mud-test.herokuapp.com/api/adv/init/'
            )
            .then(res => {
                console.log("init res", res.data)

                axiosWithAuth()
                .post(
                    "https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: "n"}
                )
                .then(res => {
                    console.log("move result", res.data);
                    
                })
                .catch(error => {
                    console.log(error.message);
                });
                
            })
            .catch (err => {
                console.log(err.message)
            })

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



       
        axiosWithAuth()
        .post(
            "https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: "e"}
        )
        .then(res => {
            console.log("move result", res.data);
            setMoveInfo(res.data);
        })
        .catch(error => {
            console.log(error.message);
        });

    }, [])

    const Move=(dir)=>{
        axiosWithAuth()
        .post(
            "https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: `${dir}`}
        )
        .then(res => {
            console.log("move result", res.data);
            setMoveInfo(res.data)
            
        })
        .catch(error => {
            console.log(error.message);
        });
    }


    return(
        <div className = "dashboard-container">
            <Header /> 

            <ReactVis rooms = {rooms}/>

            <div className = "dashboard-div">

                <div className = "map">
                    <div className="gridContainer">
                    <Map />
                    </div>
                   

                </div>{/*end map*/}

                <div className = "right-half">

                    <div className = "rooms">
                        You are located in: <br/>{moveInfo.title}
                        <div className= "description">
                        {moveInfo.description}
                        <br/>
                        <b>{moveInfo.error_msg}</b>
                        </div>

                    </div>

                    <div className = "players">
                        The following players are here:<br></br>
                        {moveInfo.players.map(p =>{
                            return(<>{p}, </>) //this needs to be in a scrolling text box
                        })}

                    </div>

                    <div className = "directions">
                    <button onClick={()=>Move("n")}>NORTH</button> 
                    <button onClick={()=>Move("s")}>SOUTH</button> 
                    <button onClick={()=>Move("e")}>EAST</button> 
                    <button onClick={()=>Move("w")}>WEST</button>

                    </div>

                </div>{/*end right-half*/}

            </div>
            
        </div>
    );

}{/*end dashboard*/}

export default Dashboard;