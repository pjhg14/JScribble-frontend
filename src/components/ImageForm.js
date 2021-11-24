import { useState } from "react"
import { imageURL } from "../utils/urls"

export default function ImageForm({ actionType, canvasData, closeModal}) {
    const [imageName, setImageName] = useState("")
    const [imageDescription, setImageDescription] = useState("")
    const [imagePrivacy, setImagePrivacy] = useState(false)

    function handleFormSubmit(event) {
        event.preventDefault()

        fetch(imageURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                title: imageName,
                description: imageDescription,
                private: imagePrivacy
            }),
        })
            .then(resp => resp.json())
            .then(addedImage => {
                // closeModal() // not needed?
                // Go to added image page
            })
    }

    return(
        <>
            {actionType === "upload" ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title" 
                            type="text"
                            value={imageName}
                            onChange={e => setImageName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description"
                            value={imageDescription}
                            onChange={e => setImageDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="image-privacy">Private?</label>
                        <input
                            id="image-privacy" 
                            type="checkbox"
                            value={imagePrivacy}
                            onChange={e => setImagePrivacy(e.target.value)}
                        />
                        <p>{imagePrivacy ? "Yes" : "No"}</p>
                    </div>

                    <input className="button" type="submit" />
                </form>
            ) : (
                <div>
                    <span>
                        <label htmlFor="file-name">File Name</label>
                        <input 
                            id="file-name"
                            type="text"
                            value={imageName}
                            onChange={e => setImageName(e.target.value)}
                        />
                        <p className="input-suffix">.png</p>
                    </span>
                    <a 
                        className="button"
                        download={`${imageName ? imageName : "JScribble-doodle"}.png`} 
                        href={canvasData}
                    >
                        <p>save</p>
                        <p className="sub-script">{imageName ? imageName : "JScribble-doodle"}.png</p>
                    </a>
                </div>
            )}
        </>
    )
}