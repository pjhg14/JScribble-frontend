import { useContext, useState } from "react";
import { UserContext } from "../App";
import { userURL } from "../utils/urls";
import Login from "./Login";
import Signup from "./Signup";

export default function Portal({authType, closeModal}) {
    const { setUserParams } = useContext(UserContext)
    const [errors, setErrors] = useState([])

    const errorList = errors.map(error => {
        return(
            <li key={error}>
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
        if (!(authType !== "login" && authType !== "signup")) {
            setErrors(["Invalid auth Type"])
            return
        }

        setErrors([])
        
        fetch(`${userURL}/${authType}`, {
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
                    setUserParams(payload.user)
                    closeModal()
                }
            })
    }

    // console.log(user)

    return(
        <>
            {authType === "login" ? (
                <Login login={submitCredentials}/>
            ) : (
                <Signup signup={submitCredentials} addError={addError}/>
            )}
            <div className="error-box">
                <ul>
                    {errorList}
                </ul>
            </div>
        </>
    )
}