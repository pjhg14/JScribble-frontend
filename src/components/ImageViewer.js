import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from "../App"
import { imageURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./Loading";

export default function ImageViewer() {
    const { user } = useContext(UserContext)
    const { imageId } = useParams()
    // const [image, setImage] = useState(null)
    const [image, setImage] = useState({
        id: 1,
        url: "/assets/testing/19222_en_1.jpg",
        title: "Lorem",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    })
    const [isLoaded, setIsLoaded] = useState(true)
    const navigate = useNavigate()

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
            <header className="gallery-item-header flex">
                <h1 className="title">{image.title}</h1>
                <button className="button back" onClick={() => navigate(-1)}>Back</button>
            </header>
            <section className="image-content grid">
                <img className="presentation" src={image.url} alt={image.title} />
                <div>
                    <h2>Description</h2>
                    <p>{image.description ? image.description : "No description given"}</p>
                </div>
                {/* TODO: update image params */}
            </section>
        </div>
    )
}