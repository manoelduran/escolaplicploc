import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import {AddTeacher} from '../pages/AddTeacher';
import { ClassRooms } from "../pages/ClassRooms";
import { Room } from "../pages/Room";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addTeacher" element={<AddTeacher/>} />
            <Route path="/classRooms" element={<ClassRooms />} />
            <Route path="/classRooms:id" element={<Room/>}/>
        </ Routes>
    )
}

export default Router;