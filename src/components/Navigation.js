import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../App";

export default function Navigation() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    console.log({user})

    return(
        <nav className="navigation flex">
            <ul className="flex  gap-half">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/draw">Draw</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/gallery" >Gallery</NavLink>
                </li>
                {user.id > 0 && 
                    <li className="nav-item last-item">
                        
                        <img 
                            className="nav-user" 
                            src={user.profile_img} 
                            alt="profile" 
                            onClick={() => navigate(`/gallery/user/${user.id}`)} 
                        />
                    </li>
                }
            </ul>
           
          
         
  
            
        </nav>
    )
}