import { useNavigate } from "react-router"

export default function NullPath() {
    const navigate = useNavigate()

    return(
        <div className="error-page flex column center">
            <h1>404</h1>
            <h1 className="null-query-header">Oops, couldn't find what you were looking for</h1>
            <button className="button" onClick={() => navigate("/gallery")}>Return to gallery</button>
        </div>
    )
}