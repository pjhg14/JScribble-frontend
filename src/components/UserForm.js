import { useContext, useState } from "react"
import { UserContext } from "../App"
import { userURL } from "../utils/urls"

export default function UserForm({ actionType, closeModal }) {
    const { user, userDispatch } = useContext(UserContext)
    const [username, setUsername] = useState(user.username)
    const [file, setFile] = useState(null)
    const [imageName, setImageName] = useState(user.profile_img)
    const [errors, setErrors] = useState([])

    const errorList = errors.map(error => {
        return(
            <li key={error}>
                {error}
            </li>
        )
    })

    function handleFormSubmit(event) {
        event.preventDefault()

        if (actionType === "upload") {
            handleImageUpload()
        } else {
            handleUsernameUpdate()
        }
    }

    function handleImageUpload() {
        fetch(`${userURL}/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                profile_img: file
            }),
        })
            .then(resp => resp.json())
            .then(updatedUser => {
                userDispatch({
                    type: "setUser",
                    payload: updatedUser
                })

                closeModal()
            })
    }

    function handleUsernameUpdate() {
        fetch(`${userURL}/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                username
            }),
        })
            .then(resp => resp.json())
            .then(updatedUser => {
                if (updatedUser.error) {
                    setErrors(updatedUser.details)
                } else {
                    userDispatch({
                        type: "setUser",
                        payload: updatedUser
                    })

                    closeModal()
                }
            })
    }

    function handleImageSelection(event) {
        const targetImage = event.target.files[0]

        setFile(targetImage)
        setImageName(targetImage ? targetImage.name : "")
    }

    return(
        <div>
            <form className="flex column center" onSubmit={handleFormSubmit}>
                { actionType === "upload" ? (
                    <span className="flex">
                        <label className="iu-label" htmlFor="image-uploader">Upload Image</label>
                        <input
                            id="image-uploader"
                            className="image-uploader"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelection}
                        />
                        <p>{imageName ? imageName : "No file Chosen"}</p>
                    </span>
                ) : (
                    <span className="form-field flex">
                        <label htmlFor="username">Change Username</label>
                        <input
                            className="text-field"
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </span>
                )}

                <button className="button" type="submit">{actionType}</button>
            </form>
            <div className={`error-box ${errorList.length > 0 ? "" : "hidden"}`}>
                <h2>Error:</h2>
                <ul>
                    {errorList}
                </ul>
            </div>
        </div>
    )
}