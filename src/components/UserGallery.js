import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { UserContext } from "../App"
import { userURL } from "../utils/urls"
import Navigation from "./Navigation"

export default function UserGallery() {
    const { user } = useContext(UserContext)
    const [isPersonalGallery, setIsPersonalGallery] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const { userId } = useParams()

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

    if (!isLoaded) return <h1>...Loading</h1>

    // const creations = userData.images.map(image => {
    //     return(
    //         <div></div>
    //     )
    // })

    return(
        <div className="gallery">
            <Navigation />
            <header>
                <h1>User Gallery</h1>
                {/* <h1>{user.username}'s' Gallery</h1> */}
            </header>
            <main className="flex">
                <section className="flex">
                    {/* profile pic */}
                    <img src={userData.profile_img} alt={userData.username} />
                    {/* user options (if user is the one logged in) */}
                    {isPersonalGallery && 
                        <>
                            <button className="button">Upload image</button>
                            <button className="button">Change username</button>
                        </>
                    }
                </section>
                <section className="works grid">
                    {/* list of creations */}
                </section>
            </main>
        </div>
    )
}