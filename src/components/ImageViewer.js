import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { imageURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./LoadingPage"
import { AnimatePresence } from "framer-motion"
import Modal from "./modal/Modal"
import ImageOptions from "./ImageOptions"

export default function ImageViewer() {
    const { user } = useContext(UserContext)
    const { imageId } = useParams()
    const [image, setImage] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [actionType, setActionType] = useState("")
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

    function handleClose() {
        setModalOpen(false)
    }

    function handleOpen(type) {
        setActionType(type)
        setModalOpen(true)   
    }

    return(
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                { modalOpen && 
                    <Modal handleClose={handleClose}>
                         <ImageOptions image={image} setImage={setImage} actionType={actionType} closeModal={handleClose} />
                    </Modal>
                }
            </AnimatePresence>
            <div className="gallery">
                <Navigation />
                <header className="gallery-item-header flex">
                    <div>
                        <h1 className="title">{image.title}</h1>
                        <h2>By <Link to={`/gallery/user/${image.user.id}`}>{image.user.username}</Link></h2>
                    </div>
                    <button className="button back" onClick={() => navigate(-1)}>Back</button>
                </header>
                <section className="image-content flex wrap">
                    <img className="presentation" src={image.url} alt={image.title} />
                    <div className="flex column">
                        <h2>Description</h2>
                        <p>{image.description ? image.description : "No description given"}</p>
                    </div>
                </section>
                { user.id === image.user.id &&
                    <section className="options flex">
                        <button className="button" onClick={() => handleOpen("update")}>Update</button>
                        <button className="button inverted delete" onClick={() => handleOpen("delete")}>Delete</button>
                    </section>
                }
            </div>
        </>
    )
}