import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from "../App"
import { userURL } from "../utils/urls"
import Navigation from "./Navigation"
import Loading from "./Loading";
import NullPath from "./NullPath";
import Modal from "./Modal"
import { AnimatePresence } from "framer-motion"
import UserForm from "./UserForm"

const testImages = [
    {
        id: 1,
        url: "/assets/testing/19222_en_1.jpg",
        title: "Lorem",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 2,
        url: "/assets/testing/19305_en_1.jpg",
        title: "ipsum",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 3,
        url: "/assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 4,
        url: "/assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 5,
        url: "/assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 6,
        url: "/assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    }
]

export default function UserGallery() {
    const { user } = useContext(UserContext)
    const [isPersonalGallery, setIsPersonalGallery] = useState(false)
    // const [userData, setUserData] = useState(null)
    const [userData, setUserData] = useState({
        id: 1,
        username: "user1",
        profile_img: "https://avatars.dicebear.com/api/croodles-neutral/tom.svg"
    })
    const [isLoaded, setIsLoaded] = useState(true)
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
        // if (userId === user.id) {
        //     setIsPersonalGallery(true)
        //     setUserData(user)
        // } else {
        //     setIsPersonalGallery(false)
        //     fetch(`${userURL}/${userId}`)
        //         .then(resp => resp.json())
        //         .then(queriedUser => {
        //             console.log(queriedUser)
        //             setUserData(queriedUser)
        //         })
        // }

        // setIsLoaded(true)
    },[user, userId])

    if (!isLoaded) return <Loading />

    if (isLoaded && !userData) return <NullPath />

    // const creations = userData.images.map(image => {
    //     return(
    //         <div></div>
    //     )
    // })

    const testCreations = testImages.map(image => {
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
                        {/* {isPersonalGallery &&  */}
                        {true && 
                            <>
                                <button className="button" onClick={() => handleOpen("upload")}>Upload image</button>
                                <button className="button" onClick={() => handleOpen("update")}>Change username</button>
                            </>
                        }
                    </section>
                    <section className="works grid">
                        {/* list of creations */}
                        { testCreations }
                    </section>
                </main>
            </div>
        </>
    )
}