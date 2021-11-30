import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { imageURL, userURL } from "../utils/urls";
import Divider from "./Divider";
import Navigation from "./Navigation";
import Loading from "./Loading";

export default function Gallery() {
    const [queryType, setQueryType] = useState("images")
    const [query, setQuery] = useState("")
    const [images, setImages] = useState([])
    const [users, setUsers] = useState([])
    const [emptyResult, setEmptyResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const startingQuery = useCallback(sampleItems,[queryType])

    useEffect(() => {
        startingQuery()
    },[startingQuery])

    const imageCards = images.map(image => {
        return(
            <div className="card flex column center" key={image.id}>
                <img 
                    className="image-small" 
                    src={image.url} 
                    alt={image.title} 
                    onClick={() => navigate(`image/${image.id}`)}
                />
                <p className="">{image.title}</p>
            </div>
        )
    })

    const userCards = users.map(user => {
        return(
            <div className="card flex column center" key={user.id}>
                <img 
                    className="profile-small pointer" 
                    src={user.profile_img} 
                    alt={user.username} 
                    onClick={() => navigate(`user/${user.id}`)}
                />
                <p className="">{user.username}</p>
            </div>
        )
    })

    // get a sample of items in the database
    function sampleItems() {
        setLoading(true)

        if (queryType === "users") {
            fetch(`${userURL}/sample`)
                .then(resp => resp.json())
                .then(queriedUsers => {
                    setLoading(false)

                    if (queriedUsers) {
                        setUsers(queriedUsers)
                        setImages([])
                        setEmptyResult(false)
                        
                    } else {
                        resetLists()
                    }
                })
        } else {
            fetch(`${imageURL}/sample`)
                .then(resp => resp.json())
                .then(queriedImages => {
                    setLoading(false)

                    if (queriedImages) {
                        setUsers([])
                        setImages(queriedImages)
                        setEmptyResult(false)
                        
                    } else {
                        resetLists()
                    }
                })
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        setLoading(true)

        if (queryType === "images") {
            fetch(`${imageURL}/find/${query}`)
                .then(resp => resp.json())
                .then(queriedImages => {
                    setLoading(false)

                    if (queriedImages.error || queriedImages.length <= 0) {
                        resetLists()
                    } else {
                        setImages(queriedImages)
                        setUsers([])
                        setEmptyResult(false)
                    }

                })
        } else {
            fetch(`${userURL}/find/${query}`)
                .then(resp => resp.json())
                .then(queriedUsers => {
                    setLoading(false)

                    if (queriedUsers.error || queriedUsers.length <= 0) {
                        resetLists()
                    } else {
                        setImages([])
                        setUsers(queriedUsers)
                        setEmptyResult(false)
                    }
                })
        }        
    }

    function resetLists() {
        setImages([])
        setUsers([])
        setEmptyResult(true)
    }

    return(
        <>
            <Navigation />
            <main className="gallery flex">
                <header className="gallery-header flex">
                    <h1 className="title">Gallery</h1>
                </header>
                <section className="search flex gap-none">
                    <select className="sb-item start" onChange={e => setQueryType(e.target.value)}>
                        <option value="images">images</option>
                        <option value="users">users</option>
                    </select>
                    <form className="sb-item flex center" role="search" onSubmit={handleFormSubmit}>
                        <input 
                            className="sb-item middle" 
                            type="search" placeholder="Search images & users" 
                            aria-label="search users or images" 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button className="sb-item end" type="submit">search</button>
                    </form>
                </section>

                <Divider />

                <section className="results flex">
                    { loading ? (
                        <Loading />
                    ) : (
                        <div className="result-list grid">
                            { emptyResult && <h2 className="empty-set">No results</h2> }
                            { imageCards }
                            { userCards }
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}