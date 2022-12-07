import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import {AddTeacher} from '../pages/AddTeacher';
import { ClassRooms } from "../pages/ClassRooms";
import { AddEditStudent } from "../pages/AddEditStudent";
import { AddEditTeacher } from "../pages/AddEditTeacher";
import {TeacherProfile} from '../'
import { Room } from "../pages/Room";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddEditStudent/:id" element={<AddEditStudent />} />
            <Route path="/AddEditTeacher/:id" element={<AddEditTeacher />} />
            <Route path="/addTeacher" element={<AddTeacher/>} />
            <Route path="/classRooms" element={<ClassRooms />} />
            <Route path="/classRooms/:id" element={<Room />} />
            <Route path="/showTeacher/:" element={<TeacherProfile />} />
        </Routes>
    )
}

export default Router;