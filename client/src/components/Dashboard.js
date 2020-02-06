import React, { useEffect, useState } from "react";
import { Icon, Card, Modal, Popup, Message } from "semantic-ui-react";
import 'semantic-ui-css/semantic.css'; 
import 'semantic-ui-css/semantic.min.css'; 
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import ReactVis from "./ReactVis.js";
import Map from "../components/Map"; 
import character from "../assets/character.png"
// import Grid from "../components/Grid";
import room_names from "../data/room_names"


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
    console.log(room_names[0].pos[0]+"px", room_names[0].pos[1]+"px")//position from data
    console.log(room_names[0].room)//room name from data

    useEffect(() => {

        axiosWithAuth().get(
            'https://csbuildonelee.herokuapp.com/api/adv/init'
            )
            .then(res => {
                console.log("init res", res.data);  
                setMoveInfo(res.data);     
                setMoveErrorMsg(res.data.error_msg);

                room_names.map(room=>{
                    // console.log(room.room)
                    // console.log("current BE ROOM",res.data.title)
                    const beRoom=res.data.title
                    const feRoom=room.room
                    if(beRoom===feRoom){
                        console.log("Old Pos", pos)
                        setPos([room.pos[0], room.pos[1]])
                        console.log("WE FOUND A MATCH")
                        console.log("These are new coordinates",[room.pos[0], room.pos[1]])
                        console.log("NewPosition",pos)
                    }else{
                        return
                    }
                })
                
                
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
        <div className = "dashboard-container" key="key">
            <Header />           

            <div className = "dashboard-div" key="key">

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

                    {/*<div className = "rooms">*/}
                        <Card className = "rooms" style={{overflow: 'auto'}}>
                            <Card.Content>
                                <h3>
                                    {moveInfo.title}
                                </h3>

                                <Card.Description>
                                    
                                    <div className= "description">
                                        {moveInfo.description}                                        
                                    </div>
                                </Card.Description>

                            </Card.Content>

                        </Card>

                    {/*</div>*/}    

                    {/*error msg*/}
                    
                    {moveInfo.error_msg && moveInfo.error_msg.length > 0 ?                                 
                        <Message className = "error-msg" color='red'>{moveInfo.error_msg}</Message>  
                    :
                    null}  
                    

                    {/*<div className = "players">  */}

                    <Card className = "players" style={{overflow: 'auto'}}>
                        <Card.Content>
                            <h3>
                                Players
                            </h3>

                            <Card.Description>  
                    
                                        
                        {
                            moveInfo.players.length === 0 ? <p>Oh No! You are alone here!!</p> : 
                            <>
                            {moveInfo.players.map(p =>{
                                return(<>{p}, </>) //this needs to be in a scrolling text box
                            })}
                            </>
                        }
                            </Card.Description>

                        </Card.Content>

                    </Card>
                        

                    {/*</div>*/}

                   {/* <div className = "directions">*/}

                    <Card className = "directions">
                            <Card.Content>                                
                                

                        <div className = "north"> <button onClick={()=>Move("n")}>NORTH</button> </div>

                        <div className = "east-west"> 
                            <button className = "west-btn" onClick={()=>Move("w")}>WEST</button>
                            <button onClick={()=>Move("e")}>EAST</button>                                                       
                             
                        </div>

                        <div className = "south"> 
                            <button onClick={()=>Move("s")}>SOUTH</button>    
                           
                        </div>                               

                        </Card.Content>

                    </Card>

                    {/* </div>*/}

                </div>{/*end right-half*/}

            </div>{/*end dashboard div*/}
            
            
        </div> );{/*end dashboard container*/}
    

}{/*end dashboard*/}

export default Dashboard;