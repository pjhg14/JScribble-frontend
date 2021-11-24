import { useState } from "react"

export default function Signup({ signup, addError }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        if (password !== passwordConf) {
            addError("Password fields must match")
            setUsername("")
            setPassword("")
            setPasswordConf("")
            
            return
        }

        signup({
            username,
            password,
            profile_img: `https://avatars.dicebear.com/api/croodles-neutral/${username}.svg`
        })

        setUsername("")
        setPassword("")
        setPasswordConf("")
    }

    return(
        <form className="signup" onSubmit={onFormSubmit}>
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

            <label htmlFor="password-conf">Verify Password</label>
            <input 
                id="password-conf"
                type="password" 
                value={passwordConf} 
                onChange={e => setPasswordConf(e.target.value)}
            />

            <input className="button" type="submit" />
        </form>
    )
}