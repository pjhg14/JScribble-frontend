import { createContext, useEffect, useReducer } from "react";
import { Route, Routes } from "react-router";
import Canvas from "./components/Canvas";
import GalleryPage from "./components/GalleryPage";
import ImageViewer from "./components/ImageViewer";
import LandingPage from "./components/LandingPage";
import UserGallery from "./components/UserGallery";
import { initialUserState, userReducer } from "./utils/reducers/userReducer";
import { loginURL } from "./utils/urls";

export const UserContext = createContext()

export default function App() {
    const [user, setUserParams] = useReducer(userReducer, initialUserState)

    useEffect(() => {
        // upon getting onto landing page check if a token exists
        if (localStorage.token) {
            // fetch user data
            fetch(loginURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedUser => {
                    // set user data
                    setUserParams({
                        type: "login",
                        payload: queriedUser
                    })
                })
        }
    },[])

    return (
        <UserContext.Provider value={
            {
                user,
                setUserParams
            }
        }>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="draw" element={<Canvas />} />
                <Route path="gallery" element={<GalleryPage />}/>
                <Route path="gallery/user/:userId" element={<UserGallery />} />
                <Route path="gallery/user/:userId/image/:imageId" element={<ImageViewer />}/>
            </Routes>
        </UserContext.Provider>
    )
}