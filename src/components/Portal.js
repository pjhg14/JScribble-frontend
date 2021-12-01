import { useContext, useState } from "react";
import { UserContext } from "../App";
import { userURL } from "../utils/urls";
import Login from "./Login";
import Signup from "./Signup";

export default function Portal({ authType, closeModal }) {
    const { userDispatch } = useContext(UserContext)
    const [errors, setErrors] = useState([])

    const errorList = errors.map(error => {
        return(
            <li className="error" key={error}>
                {error}
            </li>
        )
    })

    function addError(error) {
        const uniqueErrors = [...errors, error].filter((value, index, self) => {
            return self.indexOf(value) === index;
        })
        setErrors(uniqueErrors)
    }

    function submitCredentials(credentials) {
        if (authType !== "login" && authType !== "signup") {
            setErrors(["Invalid auth Type"])
            return
        }

        setErrors([])
        
        // Get token
        fetch(`${userURL}/${authType === "login" ? "login" : ""}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then(resp => resp.json())
            .then(payload => {
                if (payload.error) {
                    // show error in payload
                    setErrors(payload.details)  
                } else {
                    localStorage.token = payload.token
                    
                    // Get user data from token
                    fetch(`${userURL}/token`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.token}`
                        }
                    })
                        .then(resp => resp.json())
                        .then(userData => {
                            userDispatch({
                                type: "setUser",
                                payload: userData
                            })
                            closeModal()
                        })
                }
            })
    }

    return(
        <div className="portal flex ">
            {authType === "login" ? (
                <Login login={submitCredentials}/>
            ) : (
                <Signup signup={submitCredentials} addError={addError}/>
            )}
            <div className={`error-box ${errorList.length > 0 ? "" : "hidden"}`}>
                <h2>Error:</h2>
                <ul className="errors">
                    {errorList}
                </ul>
            </div>
        </div>
    )
}