import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function GalleryPage() {
    const [queryType, setQueryType] = useState("image")
    const [images, setImages] = useState([])
    const [users, setUsers] = useState([])
    const params = useParams()

    console.log(params)

    useEffect(() => {
        // fetch top images
    },[])

    function handleFormSubmit(event) {
        event.preventDefault()

        if (queryType === "image") {
            fetch("query image")
                .then(resp => resp.json())
                .then(queriedImages => {
                    setImages(queriedImages)
                    setUsers([])
                })
        } else {
            fetch("query users")
                .then(resp => resp.json())
                .then(queriedImages => {
                    setImages([])
                    setUsers(queriedImages)
                })
        }

        
    }

    return(
        <div>
            <h1>Gallery</h1>
            {/* search for user or image title */}
            <p>Search for creations or users</p>
            <span className="flex">
                <select>
                    <option value="image">images</option>
                    <option value="user">users</option>
                </select>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" />
                    <input type="submit" />
                </form>
            </span>
            {images}
            {users}
        </div>
    )
}