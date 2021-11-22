// import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router";
import DrawPage from "./components/DrawPage";
import LandingPage from "./components/LandingPage";

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="draw" element={<DrawPage />}/>
        </Routes>
    )
}