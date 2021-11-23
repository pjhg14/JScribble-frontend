import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function UserGallery() {
    const [isPersonalGallery, setIsPersonalGallery] = useState(false)
    const params = useParams()

    console.log(params)

    useEffect(() => {
        if (params.userId === "personal") {
            // get user fron token
            console.log("personal gallery")
            setIsPersonalGallery(true)
        } else {
            // get user from userId
            console.log("other gallery")
            setIsPersonalGallery(false)
        }
    },[])

    return(
        <div>
            <h1>User Gallery</h1>
            <p>{params.userId}</p>
            {/* Username and profile */}
            {/* list of creations */}
        </div>
    )
}