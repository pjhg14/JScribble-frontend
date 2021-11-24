import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { UserContext } from "../App"
import { imageURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./Loading";

export default function ImageViewer() {
    const { user } = useContext(UserContext)
    const { imageId } = useParams()
    const [image, setImage] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // fetch(`${imageURL}/${imageId}`)
        //     .then(resp => resp.json())
        //     .then(queriedImage => {
        //         setImage(queriedImage)
        //         setIsLoaded(true)
        //     })
    },[])

    if (!isLoaded) return <Loading />

    return(
        <div className="gallery">
            <Navigation />
            <header>
                <h1>{image.title}</h1>
            </header>
            <section>
                <img src={image.url} alt={image.title} />
                <p>{image.description}</p>
            </section>
        </div>
    )
}