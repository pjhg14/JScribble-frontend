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
        <div className="signup flex">
            <h1>Sign-up</h1>
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

                <span className="form-field flex">
                    <label htmlFor="password-conf">Verify Password</label>
                    <input
                        className="text-field"
                        id="password-conf"
                        type="password" 
                        value={passwordConf} 
                        onChange={e => setPasswordConf(e.target.value)}
                    />
                </span>

                <button className="button" type="submit">Sign-up</button>
            </form>
        </div>
    )
}