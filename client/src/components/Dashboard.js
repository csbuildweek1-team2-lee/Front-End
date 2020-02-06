import React, { useEffect, useState } from "react";
import { Icon, Card, Modal, Popup } from "semantic-ui-react";
import 'semantic-ui-css/semantic.css'; 
import 'semantic-ui-css/semantic.min.css'; 
import axios from "axios";
import Header from './Header';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ReactVis from "./ReactVis.js";
import Map from "../components/Map"; 
import Grid from "../components/Grid";


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

    const [resetInfo, setResetInfo]=useState({
        
            name: "",
            title: "",
            description: "",
            players: [],
            error_msg: ""
        
    })

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
    

    const Move=(dir)=>{        

        axiosWithAuth()
        .post(
            //"https://lambda-mud-test.herokuapp.com/api/adv/move/", {direction: `${dir}`}
            'https://csbuildonelee.herokuapp.com/api/adv/move', {direction: `${dir}`}
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

                    {/*<div className="gridContainer">
                        <Map />
                    </div>*/}

                    {/*<ReactVis rooms = {rooms} currentRoom = {moveInfo.title} />*/}

                    <Grid currentRoom = {moveInfo.title}/>
                   

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
                                        <br/>
                                        <b>{moveInfo.error_msg}</b>
                                    </div>
                                </Card.Description>

                            </Card.Content>

                        </Card>

                    {/*</div>*/}

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