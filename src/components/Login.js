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
        <form className="login" onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />

            <input className="button" type="submit" />
        </form>
    )
}