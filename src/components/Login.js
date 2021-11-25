import {  useState } from "react"

export default function Login({ login }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        login({
            username,
            password
        })

        setUsername("")
        setPassword("")
    }

    return(
        <div className="login flex">
            <h1>Login</h1>
            <form className="form flex" onSubmit={onFormSubmit}>
                <span className="form-field flex">
                    <label htmlFor="username">Username</label>
                    <input
                        className="text-field"
                        id="username"
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />
                </span>

                <span className="form-field flex">
                    <label htmlFor="password">Password</label>
                    <input
                        className="text-field"
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </span>

                <button className="button" type="submit">Login</button>
            </form>
        </div>
    )
}