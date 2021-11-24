import { useNavigate } from "react-router"

export default function NullPath() {
    const navigate = useNavigate()

    return(
        <div className="error-page flex">
            <h1>404</h1>
            <h1>Oops, something went wrong</h1>
            <button className="button" onClick={() => navigate("/")}>Return to landing</button>
        </div>
    )
}