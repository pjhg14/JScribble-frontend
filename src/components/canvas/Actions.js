import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"

export default function Actions({ openModal }) {
    const { user } = useContext(UserContext)

    return(
        <div className="toolbar right flex column center">
            { user.id >= 0 ? ( 
                <div className="toolbar-group flex">
                    <span>
                        <p>{user.username}</p>
                        <img className="profile-small" src={user.profile_img} alt="user profile" />
                    </span>
                    <Link to={`/gallery/user/${user.id}`} className="button  toolbar-button">View your Gallery</Link>
                    <button 
                        className="button inverted toolbar-button"
                        onClick={() => openModal("upload")}
                    >
                        Upload
                    </button>
                </div>
            ) : (
                <div className="toolbar-group flex">
                    <button 
                        className="button toolbar-button" 
                        onClick={() => openModal("login")}
                    >
                        Login
                    </button>
                    <p>or</p>
                    <button 
                        className="button inverted toolbar-button" 
                        onClick={() => openModal("signup")}
                    >
                        Sign Up
                    </button>
                </div>
            )}
            <div className="toolbar-group flex">
                <Link to="/" className="button toolbar-button">Main Page</Link>
                <Link to="/gallery" className="button toolbar-button">Galleries</Link>
                <button 
                    className="button inverted toolbar-button"
                    onClick={() => openModal("save")}
                >
                    Save
                </button>
            </div>
        </div>
    )
}