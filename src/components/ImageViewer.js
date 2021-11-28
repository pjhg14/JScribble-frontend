import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom";
// import { UserContext } from "../App"
import { imageURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./LoadingPage";

export default function ImageViewer() {
    // const { user } = useContext(UserContext)
    const { imageId } = useParams()
    const [image, setImage] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${imageURL}/${imageId}`)
            .then(resp => resp.json())
            .then(queriedImage => {
                setImage(queriedImage)
                setIsLoaded(true)
            })
    },[imageId])

    if (!isLoaded) return <Loading />

    return(
        <div className="gallery">
            <Navigation />
            <header className="gallery-item-header flex">
                <div>
                    <h1 className="title">{image.title}</h1>
                    <h2>By <Link to={`/gallery/user/${image.user.id}`}>{image.user.username}</Link></h2>
                </div>
                <button className="button back" onClick={() => navigate(-1)}>Back</button>
            </header>
            <section className="image-content grid">
                <img className="presentation" src={image.url} alt={image.title} />
                <div>
                    <h2>Description</h2>
                    <p>{image.description ? image.description : "No description given"}</p>
                </div>
                {/* TODO: update image params, delete image (if user is owner) */}
            </section>
        </div>
    )
}