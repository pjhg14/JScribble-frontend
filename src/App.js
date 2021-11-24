import { createContext, useEffect, useReducer } from "react";
import { Route, Routes } from "react-router";
import Canvas from "./components/Canvas";
import Gallery from "./components/Gallery";
import ImageViewer from "./components/ImageViewer";
import Landing from "./components/Landing";
import NullPath from "./components/NullPath";
import UserGallery from "./components/UserGallery";
import { initialUserState, userReducer } from "./utils/reducers/userReducer";
import { loginURL } from "./utils/urls";

export const UserContext = createContext()

export default function App() {
    const [user, setUser] = useReducer(userReducer, initialUserState)

    useEffect(() => {
        // keep user logged in if they have visited before
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
                    setUser({
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
                setUser
            }
        }>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="draw" element={<Canvas />} />
                <Route path="gallery" element={<Gallery />}/>
                <Route path="gallery/user/:userId" element={<UserGallery />} />
                <Route path="gallery/image/:imageId" element={<ImageViewer />}/>
                <Route path="*" element={<NullPath />} />
            </Routes>
        </UserContext.Provider>
    )
}