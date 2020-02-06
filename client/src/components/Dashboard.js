import React, { useEffect, useState } from "react";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import ReactVis from "./ReactVis.js";
import Map from "../components/Map"; 
import character from "../assets/character.png"
// import Grid from "../components/Grid";


function Dashboard(){

    const [rooms, setRooms] = useState([]);    
    const [moveErrorMsg, setMoveErrorMsg] = useState();
    const [initInfo, setInitInfo] = useState()
    const [moveInfo, setMoveInfo] =useState({
        name: "",
        title: "",
        description: "",
        players: [],
        error_msg: ""
    })

    const [pos, setPos] = useState([-760, 20])

    useEffect(() => {

        axiosWithAuth().get(
            //'https://lambda-mud-test.herokuapp.com/api/adv/init/'
            'https://csbuildonelee.herokuapp.com/api/adv/init'
            )
            .then(res => {
                console.log("init res", res.data);  
                setMoveInfo(res.data);     
                setMoveErrorMsg(res.data.error_msg);                       
                
            })
            .catch (err => {
                console.log(err.message)
            })

    }, []);
    

    let increments = 80
    const Move=(dir)=>{        

        axiosWithAuth()
        .post(
            "https://csbuildonelee.herokuapp.com/api/adv/move/", {direction: `${dir}`}
        )
        .then(res => {
            console.log("move result", res.data);
            setMoveInfo(res.data)
            if(res.data.error_msg===""){//if no error...
                if(`${dir}`=== "n"){//and direction is North
                    if(pos[1] +increments > 740){ //checking to see if we're off the map
                        console.log("WE'RE OFF THE MAP")
                        return
                    }else{//if not, set to new position
                        setPos([pos[0], pos[1] +increments])
                    }
                }if(`${dir}`==="s"){//and direction is South
                    if(pos[1]-increments < 20){ //checking to see if we're off the map
                        console.log("You're off the map")
                        return
                    }else{//if not, set to new position
                        setPos([pos[0],pos[1] -increments])
                    }
                }if(`${dir}`==="e"){
                    if(pos[0]+increments > -40){ //checking to see if we're off the map
                        console.log("Off the map")
                        return
                    }else{//if not, set to new position
                        setPos([pos[0]+increments,pos[1]])
                    }
                }if(`${dir}`==="w"){
                    if(pos[0]-increments < -800){ //checking to see if we're off the map
                        console.log("Off the map")
                    }else{//if not, set to new position
                        setPos([pos[0]-increments,pos[1]])
                    }
                }

            console.log("CURRENT POSITION",pos)
            }
            
        })
        .catch(error => {
            console.log(error.message);
        });
    }


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        Move("n")
    }
    else if (e.keyCode == '40') {
        Move("s")
    }
    else if (e.keyCode == '37') {
       Move("w")
    }
    else if (e.keyCode == '39') {
       Move("e")
    }

}


    return(
        <div className = "dashboard-container">
            <Header />           

            <div className = "dashboard-div">

                <div className = "map">
                <Map />

                    <div className="charContainer">
                        <img src={character} className="char" alt="character" style = {{bottom: pos[1] + "px", left: pos[0] + "px"}}></img>
                    </div>
                    {/*<div className="gridContainer">
                        <Map />
                    </div>*/}

                    {/*<ReactVis rooms = {rooms} currentRoom = {moveInfo.title} />*/}

                    {/* <Grid currentRoom = {moveInfo.title}/> */}
                   

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
                        {
                            moveInfo.players.length === 0 ? <p>Oh No! You are alone here!!</p> : 
                            <>The following players are here:<br></br>
                            {moveInfo.players.map(p =>{
                                return(<>{p}, </>) //this needs to be in a scrolling text box
                            })}
                            </>
                        }
                        

                    </div>

                    <div className = "directions">

                        <div className = "north"> <button onClick={()=>Move("n")}>NORTH</button> </div>

                        <div className = "south-east"> 
                            <button onClick={()=>Move("s")}>SOUTH</button> 
                            <button onClick={()=>Move("e")}>EAST</button> 
                        </div>

                        <div className = "west">                     
                            <button onClick={()=>Move("w")}>WEST</button>
                        </div>

                    </div>

                </div>{/*end right-half*/}

            </div>{/*end dashboard div*/}
            
            
        </div> );{/*end dashboard container*/}
    

}{/*end dashboard*/}

export default Dashboard;