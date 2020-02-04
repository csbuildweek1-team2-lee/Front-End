import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Dashboard(){

    const [moveInfo, setMoveInfo] =useState({
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
                console.log("init res", res)
                
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
            setMoveInfo(res.data)

            
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

            <div className = "dashboard-div">

                <div className = "map">
                    map map map

                   

                </div>{/*end map*/}

                <div className = "right-half">

                    <div className = "rooms">
                        You are located in: {moveInfo.title}
                        <div className= "description">
                        {moveInfo.description}
                        </div>

                    </div>

                    <div className = "players">
                        players players players

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