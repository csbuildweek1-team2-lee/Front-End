import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ReactVis from "./ReactVis.js";

function Dashboard(){

    const [rooms, setRooms] = useState([])

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



       

    }, [])

    return(
        <div className = "dashboard-container">
            <Header /> 

            <ReactVis rooms = {rooms}/>

            <div className = "dashboard-div">

                <div className = "map">
                    map map map

                   

                </div>{/*end map*/}

                <div className = "right-half">

                    <div className = "rooms">
                        rooms rooms rooms

                    </div>

                    <div className = "players">
                        players players players

                    </div>

                    <div className = "directions">
                        directions directions directions

                    </div>

                </div>{/*end right-half*/}

            </div>
            
        </div>
    );

}{/*end dashboard*/}

export default Dashboard;