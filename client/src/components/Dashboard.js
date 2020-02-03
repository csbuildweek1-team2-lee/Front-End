import React, { useEffect } from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Dashboard(){

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
            "https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: "n"}
        )
        .then(res => {
            console.log("move result", res.data);
            
        })
        .catch(error => {
            console.log(error.message);
        });

    }, [])

    return(
        <div className = "dashboard-container">
            <Header /> 

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