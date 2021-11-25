import { useNavigate } from "react-router";
import Navigation from "./Navigation";

export default function NullUser() {
    const navigate = useNavigate()

    return(
        <div className="gallery">
            <Navigation/>
            <div className="error-page flex">
                <h1>User Not found</h1>
                <button className="button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}