import { useContext, useState } from "react"
import { UserContext } from "../App"
import { credURL, userURL } from "../utils/urls"

export default function UserForm({ actionType, closeModal }) {
    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState(user.username)
    const [file, setFile] = useState(null)
    const [imageName, setImageName] = useState(user.profile_img)

    function handleFormSubmit(event) {
        event.preventDefault()

        if (actionType === "upload") {
            handleImageUpload()
        } else {
            handleUsernameUpdate()
        }
    }

    function handleImageUpload() {
        fetch(`${credURL}/upload`, {
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
            .then(updatedUser => setUser(updatedUser))
    }

    function handleUsernameUpdate() {
        fetch(`${userURL}/${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                username
            }),
        })
            .then(resp => resp.json())
            .then(updatedUser => setUser(updatedUser))
    }

    function handleImageSelection(event) {
        const targetImage = event.target.files[0]

        setFile(targetImage)
        setImageName(targetImage ? targetImage.name : "")
    }

    return(
        <form onSubmit={handleFormSubmit}>
            { actionType === "upload" ? (
                <div>
                    <label>Upload Image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelection}
                    />
                </div>
            ) : (
                <div>
                    <label>Change Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <p>{imageName}</p>
                </div>
            )}

            <button className="button" type="submit">{actionType}</button>
        </form>
    )
}