import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Divider from "./Divider";
import Modal from "./Modal";
import Portal from "./Portal";
import { AnimatePresence } from "framer-motion";

export default function Landing() {
    const { user } = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [authType, setAuthType] = useState("")

    function handleClose() {
        setModalOpen(false)
    }

    function handleOpen(type) {
        setAuthType(type)
        setModalOpen(true)   
    }
    
    return(
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                { modalOpen && 
                    <Modal handleClose={handleClose}>
                        <Portal authType={authType} closeModal={handleClose}/>    
                    </Modal>
                }
            </AnimatePresence>
            <div className="landing flex">
                <header className="header flex">
                    <div>
                        <h1 className="title flex center">JScribble</h1>
                        <p className="sub-title flex center">The online doodling app</p>
                    </div>
                    
                    {/* Demo video */}
                    <img className="demo-img" src="assets/JScribbleCanvas.gif" alt="demo"/>
                    {/* <div className="demo-img"></div> */}
                </header>
                <section className="landing-section flex column">
                    <h2>Create</h2>

                    <p>
                        Express yourself using our draw board. 
                        Freely draw, sketch out with lines, erase mistakes or smooth out jagged edges, 
                        and stamp with various shapes to complete your work
                    </p>
                </section>

                <Divider />

                <section className="landing-section flex column">
                    <h2>Save & Share</h2>
                    <p>
                        Save and download your work as a .png file or upload your creations to your own gallery. 
                        Choose which pieces you want to show off and share them with the world!
                    </p>
                </section>

                <Divider />

                <section className="landing-section flex column">
                    <h2>Explore</h2>
                    <p>View you own or other people's works in the gallery page</p>
                </section>

                <Divider />

                <section className="landing-section flex column">
                    <h2>How To?</h2>
                    <p>
                        Use the toolbar on the left to change the drawing method and the parameters for that method. 
                        Use the right toolbar to save your drawing and to upload your creation to your gallery
                    </p>
                </section>

                <Divider />

                <section className="landing-section sub-nav flex">
                    { user.id <= 0 ? (
                            <>
                                <Link to="/draw" className="button">Get Started!</Link>
                                <h3>Share your ideas!</h3>
                                <span className="portal-bar flex">
                                    <button className="button" onClick={() => handleOpen("login")}>Login</button>
                                    <p>or</p>
                                    <button className="button inverted" onClick={() => handleOpen("signup")}>Signup</button>
                                </span>
                                <h3>See other works!</h3>
                                <Link to="/gallery" className="button">Gallery</Link>
                            </>
                        ) : (
                            <>
                                <h3>Share your ideas!</h3>
                                <Link to="/draw" className="button">Create</Link>

                                <h3>View your profile</h3>
                                <Link to={`/gallery/user/${user.id}`} className="button">Profile</Link>

                                <h3>See other works!</h3>
                                <Link to="/gallery" className="button">Galleries</Link>
                            </>
                    )}
                </section>

                <Divider />

                <section className="landing-section flex column">
                    <h3>Meet the Dev</h3>

                    <Divider />

                    <span className="about flex">
                        <div className="dev-card flex column">
                            <h4>Paul Graham Jr.</h4>
                            <img className="dev-img" src="assets/PG-profile-pic.jpg" alt="dev-profile"/>
                        </div>

                        <p className="dev-text flex center">
                            An aspiring software developer specializing in the development fullstack web applications and 
                            fullstack and monolithic desktop applications.
                        </p>
                        <div className="links flex center">
                            <a className="link flex" href="https://www.linkedin.com/in/pgrahamjr/" target="_blank" rel="noreferrer">
                                LinkedIn
                                <FontAwesomeIcon className="icon linkedin" icon={faLinkedin}/>
                            </a>
                            <a className="link flex" href="https://github.com/pjhg14" target="_blank" rel="noreferrer">
                                GitHub
                                <FontAwesomeIcon className="icon" icon={faGithub} />
                            </a>
                            <a className="link flex" href="https://paulgrahamjr.com/" target="_blank" rel="noreferrer">
                                Portfolio
                                <img className="personal-icon" src="assets/initial-logo-dark.png" alt="logo"/>
                            </a>
                        </div>
                            
                    </span>
                </section>
                <footer className="footer flex">
                    A mintbean hackathons enterant, main site
                    <a className="mb-link" href="https://mintbean.io" target="_blank" rel="noreferrer"> here</a>
                </footer>
            </div>
        </>
    )
}