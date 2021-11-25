import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { imageURL, userURL } from "../utils/urls";
import Divider from "./Divider";
import Navigation from "./Navigation";

export default function Gallery() {
    const [queryType, setQueryType] = useState("image")
    const [query, setQuery] = useState("")
    const [images, setImages] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        sampleImages()
    },[])

    const imageCards = images.map(image => {
        return(
            <div className="card flex" key={image.id}>
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
            <div className="card flex" key={user.id}>
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

    // get a sample of all images in the database
    function sampleImages() {
        fetch(imageURL)
            .then(resp => resp.json())
            .then(queriedImages => {
                setImages(queriedImages)
            })
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        if (queryType === "image") {
            fetch(`${imageURL}/find/${query}`)
                .then(resp => resp.json())
                .then(queriedImages => {
                    setImages(queriedImages)
                    setUsers([])
                })
        } else {
            fetch(`${userURL}/find/${query}`)
                .then(resp => resp.json())
                .then(queriedUsers => {
                    setImages([])
                    setUsers(queriedUsers)
                })
        }        
    }

    return(
        <div className="gallery flex">
            <Navigation />
            <header className="gallery-header flex">
                <h1 className="title">Gallery</h1>
                <p className="sub-title"></p>
            </header>
            <section className="flex">
                <span className="search-bar flex">
                    <select className="sb-item start" onChange={e => setQueryType(e.target.value)}>
                        <option value="image">images</option>
                        <option value="user">users</option>
                    </select>
                    <form role="search" onSubmit={handleFormSubmit}>
                        <input 
                            className="sb-item middle" 
                            type="search" placeholder="Search images & users" 
                            aria-label="search users or images" 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button className="sb-item end" type="submit">search</button>
                    </form>
                </span>
                    <button className="button" onClick={sampleImages}>Sample</button>
            </section>

            <Divider />

            <section className="results flex">
                <div className="result-list grid">
                    {imageCards}
                    {userCards}
                </div>
            </section>
        </div>
    )
}