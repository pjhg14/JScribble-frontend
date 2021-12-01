import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AnimatePresence } from "framer-motion"
import { UserContext } from "../App"
import { userURL } from "../utils/urls"
import Navigation from "./Navigation"
import LoadingPage from "./LoadingPage";
import Modal from "./modal/Modal"
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
        fetch(`${userURL}/${userId}`)
            .then(resp => resp.json())
            .then(queriedUser => {
                if (queriedUser.error) {
                    setError(true)
                } else {
                    setUserData(queriedUser)
                    setIsLoaded(true)
                    setIsPersonalGallery(parseInt(userId) === user.id)
                }
            })
    },[user, userId])

    if (!isLoaded) return <LoadingPage />

    if (error) return <NullUser />

    const creations = userData.images.map(image => {
        return(
            <div className="flex center" key={image.id}>
                <div className="card flex column center" >
                    <img 
                        className="image-small" 
                        src={image.url} 
                        alt={image.title} 
                        onClick={() => navigate(`/gallery/image/${image.id}`)}
                    />
                    <p className="">{image.title}</p>
                </div>
            </div>
        )
    })

    function handleLogOut() {
        userDispatch({
            type: "logout"
        })
        navigate("/")
    }

    function handleDelete() {

        fetch(`${userURL}/deactivate`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
        })
            .then(resp => resp.json())
            .then(() => {
                userDispatch({
                    type: "logout"
                })
                navigate("/")
            })
    }

    return(
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                { modalOpen && 
                    <Modal handleClose={handleClose}>
                        { actionType === "delete" ? (
                            <div className="flex column center">
                                <h1>Delete</h1>
                                <p>Are you sure you want to deactivate your account?</p>
                                <p>All images you have uploaded will be deleted</p>
                                <button className="button inverted delete" onClick={handleDelete}>Deactivate</button>
                            </div>
                        ) : (
                            <UserForm actionType={actionType} closeModal={handleClose} />
                        )}
                    </Modal>
                }
            </AnimatePresence>
            <div className="user-page gallery">
                <Navigation />
                <header className="gallery-item-header flex">
                    <h1 className="title">{userData.username}'s Gallery</h1>
                    <button className="button back" onClick={() => navigate(-1)}>Back</button>
                </header>
                <main className="account grid">
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
                    { creations }
                </main>
                {isPersonalGallery && 
                    <footer className="flex justify-end">
                        <button className="button inverted delete" onClick={() => handleOpen("delete")}>
                            Deactivate account
                        </button>
                    </footer>
                }
            </div>
        </>
    )
}