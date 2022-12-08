import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { ClassRooms } from "../pages/ClassRooms";
import { AddEditStudent } from "../pages/AddEditStudent";
import { AddEditTeacher } from "../pages/AddEditTeacher";
import {TeacherProfile} from '../pages/TeacherProfile';
import {StudentProfile} from '../pages/StudentProfile';
import { Room } from "../pages/Room";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddEditStudent/:id" element={<AddEditStudent />} />
            <Route path="/AddEditStudent" element={<AddEditStudent />} />
            <Route path="/AddEditTeacher/:id" element={<AddEditTeacher />} />
            <Route path="/AddEditTeacher" element={<AddEditTeacher />} />
            <Route path="/classRooms" element={<ClassRooms />} />
            <Route path="/classRooms/:id" element={<Room />} />
            <Route path="/showTeacher/:id" element={<TeacherProfile />} />
            <Route path="/showStudent/:id" element={<StudentProfile />} />
        </Routes>
    )
}

export default Router;