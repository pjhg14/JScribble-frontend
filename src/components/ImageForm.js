import { useState } from "react"
import { useNavigate } from "react-router"
import { imageURL } from "../utils/urls"

export default function ImageForm({ actionType, canvasData, closeModal}) {
    const [imageName, setImageName] = useState("JScribble-doodle")
    const [imageDescription, setImageDescription] = useState("")
    const [imagePrivacy, setImagePrivacy] = useState(false)
    const navigate = useNavigate()

    function handleFormSubmit(event) {
        event.preventDefault()

        fetch(imageURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                image_data: canvasData,
                title: imageName,
                description: imageDescription,
                private: imagePrivacy
            }),
        })
            .then(resp => resp.json())
            .then(addedImage => {
                // console.log(addedImage)
                // Go to added image page
                navigate(`/gallery/image/${addedImage.id}`)
            })
    }

    return(
        <div className="flex column">
            {actionType === "upload" ? (
                <div className="flex column center">
                    <h1>Upload</h1>
                    <img className="image-preview" src={canvasData} alt="drawing" />
                    <form className="image-upload flex column center" onSubmit={handleFormSubmit}>
                        <span className="form-field flex">
                            <label htmlFor="title">Title</label>
                            <input
                                className="text-field"
                                id="title" 
                                type="text"
                                value={imageName}
                                onChange={e => setImageName(e.target.value)}
                            />
                        </span>
                        
                        <span className="form-field flex">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="textarea-field"
                                id="description"
                                value={imageDescription}
                                onChange={e => setImageDescription(e.target.value)}
                            />
                        </span>

                        <span className="flex center">
                            <label htmlFor="image-privacy">Private?</label>
                            <span className="gap-none flex center">
                                <input
                                    className="check-field"
                                    id="image-privacy" 
                                    type="checkbox"
                                    value={imagePrivacy}
                                    onChange={e => setImagePrivacy(e.target.checked)}
                                />
                                <p>{imagePrivacy ? "Yes" : "No"}</p>
                            </span>
                        </span>

                        <input className="button" type="submit" />
                    </form>
                </div>
            ) : (
                <div className="flex column center">
                    <h1>Save</h1>
                    <img className="image-preview" src={canvasData} alt="drawing" />
                    <span className="image-input flex">
                        <label htmlFor="file-name">File Name</label>
                        <span className="image-input-end flex">
                            <input 
                                className="image-name"
                                id="file-name"
                                type="text"
                                value={imageName}
                                onChange={e => setImageName(e.target.value)}
                            />
                            <p className="image-suffix">.png</p>
                        </span>
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
        </div>
    )
}