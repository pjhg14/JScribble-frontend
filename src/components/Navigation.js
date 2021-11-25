import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../App";

export default function Navigation() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <nav className="navigation flex">
            {/* landing */}
            <NavLink className="nav-link" to="/">Main</NavLink>
            {/* Draw */}
            <NavLink className="nav-link" to="/draw">Draw</NavLink>
            {/* gallery */}
            <NavLink className="nav-link" to="/gallery" >Gallery</NavLink>
            {/* user profile/gallery */}
            {user.id > 0 && 
                <img className="nav-user" src={user.profile_img} alt="profile" onClick={() => navigate(`/gallery/user/${user.id}`)} />
            }
        </nav>
    )
}