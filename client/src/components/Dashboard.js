import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ReactVis from "./ReactVis.js";
import Map from "../components/Map"; 
import character from "../assets/character.png"


function Dashboard(){

    const [rooms, setRooms] = useState([]);

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

    const [pos, setPos] = useState([-20,135])


    useEffect(() => {
       
        axiosWithAuth().get(
            'https://lambda-mud-test.herokuapp.com/api/adv/init/'
            )
            .then(res => {
                console.log("init res", res.data)
                setMoveInfo(res.data)
                
            })
            .catch (err => {
                console.log(err.message)
            })

     }, []);

     let increments = 125 //how many pixels we're moving. This will change with more rooms

    const Move=(dir)=>{
        axiosWithAuth()
        .post(
            "https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: `${dir}`}
        )
        .then(res => {
            console.log("move result", res.data);
            setMoveInfo(res.data)
            if(res.data.error_msg==""){
                if(`${dir}`== "n"){
                    setPos([pos[0], pos[1] -increments])//subtract 125
                }if(`${dir}`=="s"){
                    setPos([pos[0],pos[1] +increments])
                }if(`${dir}`=="e"){
                    setPos([pos[0] + increments,pos[1]])
                }if(`${dir}`=="w"){
                    setPos([pos[0] -increments,pos[1]])
                }
            console.log("CURRENT POSITION",pos)
            }
            
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

                        <div className="charContainer">
                            <img src={character} className="char" style = {{top: pos[1] + "px", left: pos[0] + "px"}}></img>
                        </div>
                        <div className="gridContainer">
                        {/* <Map />                     */}
                        {/* <ReactVis rooms = {rooms}/> */}
                    

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

            </div>{/*end dashboard div*/}           
            
        </div> );{/*end dashboard container*/}
    

}{/*end dashboard*/}

export default Dashboard;