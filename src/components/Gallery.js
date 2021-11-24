import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { imageURL } from "../utils/urls";
import Divider from "./Divider";
import Navigation from "./Navigation";

const testImages = [
    {
        id: 1,
        url: "assets/testing/19222_en_1.jpg",
        title: "Lorem",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 2,
        url: "assets/testing/19305_en_1.jpg",
        title: "ipsum",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 3,
        url: "assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 4,
        url: "assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 5,
        url: "assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    },
    {
        id: 6,
        url: "assets/testing/19653_en_1.jpg",
        title: "dolor",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat?",
        private: false
    }
]

const testUsers = [
    {
        id: 1,
        username: "user1",
        profile_img: "https://avatars.dicebear.com/api/croodles-neutral/tom.svg"
    },
    {
        id: 2,
        username: "user2",
        profile_img: "https://avatars.dicebear.com/api/croodles-neutral/harry.svg"
    },
    {
        id: 3,
        username: "user3",
        profile_img: "https://avatars.dicebear.com/api/croodles-neutral/sarah.svg"
    },
    {
        id: 4,
        username: "user4",
        profile_img: "https://avatars.dicebear.com/api/croodles-neutral/alex.svg"
    }
]

export default function Gallery() {
    const [queryType, setQueryType] = useState("image")
    const [images, setImages] = useState([])
    const [users, setUsers] = useState(testUsers)
    const navigate = useNavigate()

    useEffect(() => {
        // sampleImages()
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
                    className="profile-small" 
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
            fetch()
                .then(resp => resp.json())
                .then(queriedImages => {
                    setImages(queriedImages)
                    setUsers([])
                })
        } else {
            fetch("query users")
                .then(resp => resp.json())
                .then(queriedImages => {
                    setImages([])
                    setUsers(queriedImages)
                })
        }        
    }

    return(
        <div className="gallery flex">
            <Navigation />
            <header className="gallery-header flex">
                <h1 className="title">Gallery</h1>
                <p className="sub-title">Search for creations or users</p>
            </header>
            <section className="flex">
                <span className="search-bar flex">
                    <select className="sb-item start" onChange={e => setQueryType(e.target.value)}>
                        <option value="image">images</option>
                        <option value="user">users</option>
                    </select>
                    <form role="search" onSubmit={handleFormSubmit}>
                        <input className="sb-item middle" type="search" placeholder="search" aria-label="search users or images" />
                        <input className="sb-item end" type="submit" />
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