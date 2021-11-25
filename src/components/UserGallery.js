import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from "../App"
import { userURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./Loading";
import Modal from "./Modal"
import { AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"
import NullUser from "./NullUser"

export default function UserGallery() {
    const { user, userDispatch } = useContext(UserContext)
    const [isPersonalGallery, setIsPersonalGallery] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [actionType, setActionType] = useState("")
    const { userId } = useParams()
    const navigate = useNavigate()

    function handleClose() {
        setModalOpen(false)
    }

    function handleOpen(type) {
        setActionType(type)
        setModalOpen(true)   
    }

    useEffect(() => {
        if (parseInt(userId) === user.id) {
            setIsPersonalGallery(true)
            setUserData(user)
            setIsLoaded(true)

        } else {
            setIsPersonalGallery(false)
            fetch(`${userURL}/${userId}`)
                .then(resp => resp.json())
                .then(queriedUser => {
                    if (queriedUser.error) {
                        setError(true)
                    } else {
                        setUserData(queriedUser)
                        setIsLoaded(true)
                    }
                })
        }

    },[user, userId])

    function handleLogOut() {
        userDispatch({
            type: "logout"
        })
        navigate("/")
    }

    if (!isLoaded) return <Loading />

    if (error) return <NullUser />

    const creations = userData.images.map(image => {
        return(
            <div className="card flex" key={image.id}>
                <img 
                    className="image-small" 
                    src={image.url} 
                    alt={image.title} 
                    onClick={() => navigate(`/gallery/image/${image.id}`)}
                />
                <p className="">{image.title}</p>
            </div>
        )
    })

    return(
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                { modalOpen && 
                    <Modal handleClose={handleClose}>
                        <UserForm actionType={actionType} closeModal={handleClose} />
                    </Modal>
                }
            </AnimatePresence>
            <div className="user-page gallery">
                <Navigation />
                <header className="gallery-item-header flex">
                    <h1 className="title">{userData.username}'s Gallery</h1>
                    <button className="button back" onClick={() => navigate(-1)}>Back</button>
                </header>
                <main className="flex">
                    <section className="profile flex">
                        <img className="profile-full" src={userData.profile_img} alt={userData.username} />
                        {isPersonalGallery && 
                            <>
                                <button className="button" onClick={() => handleOpen("upload")}>Upload image</button>
                                <button className="button" onClick={() => handleOpen("update")}>Change username</button>
                                <button className="button inverted" onClick={handleLogOut}>Log Out</button>
                            </>
                        }
                    </section>
                    <section className="works grid">
                        { creations }
                    </section>
                </main>
            </div>
        </>
    )
}