import React, {createContext, useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/home/Home";
import Details from "../Pages/Details/Details";
import SignInSide from "../Pages/signIn/signIn"
import SignUp from "../Pages/signUp/signUp";
import CreateActivity from "../Pages/create/create";
import Message from "../Pages/message/message"
import ActivityJoined from "../Pages/ActivityJoined/ActivityJoined";
import ActivityCreated from "../Pages/ActivityCreated/ActivityCreated";



const Routers =()=> { 
    
    return ( 
        <BrowserRouter> 
        <Routes> 
            <Route path="/" element={<Home />}  />
            <Route path="/:id"  element={<Details />} />
            <Route path="/signIn"  element={<SignInSide />} />
            <Route path="/signUp"  element={<SignUp />} />
            <Route path="/createActivity"  element={<CreateActivity/>} />
            <Route path="/message"  element={<Message />} />
            <Route path="/activityJoined"  element={<ActivityJoined/>} />
            <Route path="/activityCreated"  element={<ActivityCreated/>} />
        </Routes>
        </BrowserRouter>
     
 )

}
export default Routers; 
