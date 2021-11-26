import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../App";

export default function Navigation() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <nav className="navigation flex">
            <ul>
                <li>
                    <NavLink className="nav-link" to="/">Main</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/draw">Draw</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/gallery" >Gallery</NavLink>
                </li>
                <li>
                    {user.id > 0 && 
                        <img 
                            className="nav-user" 
                            src={user.profile_img} 
                            alt="profile" 
                            onClick={() => navigate(`/gallery/user/${user.id}`)} 
                        />
                    }
                </li>
            </ul>
           
          
         
  
            
        </nav>
    )
}