import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../App"
import { imageURL } from "../utils/urls"

export default function ImageOptions({ image, setImage, actionType, closeModal }) {
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState(image.title)
    const [description, setDescription] = useState(image.description)
    const [isPrivate, setIsPrivate] = useState(image.private)
    const navigate = useNavigate()

    function handleFormSubmit(event) {
        event.preventDefault()

        fetch(`${imageURL}/${image.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                title,
                description,
                private: isPrivate
            }),
        })
            .then(resp => resp.json())
            .then(updatedImage => {
                setImage(updatedImage)
                closeModal()
            })
    }

    function handleDelete() {
        fetch(`${imageURL}/${image.id}`, {
            method: "DELETE",
            Authorization: `Bearer ${localStorage.token}`
        })
            .then(resp => resp.json())
            .then(() => {
                navigate(`/gallery/user/${user.id}`)
            })
    }

    return(
        <div>
            {actionType === "update" ? (
                <div className="flex column center">
                <h1>Update</h1>
                <img className="image-preview" src={image.url} alt="drawing" />
                <form className="image-upload flex column center" onSubmit={handleFormSubmit}>
                    <span className="form-field flex">
                        <label htmlFor="title">Title</label>
                        <input
                            className="text-field"
                            id="title" 
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </span>
                    
                    <span className="form-field flex">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="textarea-field"
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </span>

                    <span className="flex center">
                        <label htmlFor="image-privacy">Private?</label>
                        <span className="gap-none flex center">
                            <input
                                className="check-field"
                                id="image-privacy" 
                                type="checkbox"
                                value={isPrivate}
                                onChange={e => setIsPrivate(e.target.checked)}
                            />
                            <p>{isPrivate ? "Yes" : "No"}</p>
                        </span>
                    </span>

                    <input className="button" type="submit" />
                </form>
            </div>
            ) : (
                <div className="flex column center">
                    <h1>Delete</h1>
                    <p>Are you sure you want to delete {image.title}?</p>
                    <button className="button inverted delete" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}