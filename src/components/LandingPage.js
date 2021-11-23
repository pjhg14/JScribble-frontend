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

export default function LandingPage() {
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
                        <Portal authType={authType} handleClose={handleClose}/>    
                    </Modal>
                }
            </AnimatePresence>
            <div className="landing flex">
                <header className="header flex">
                    <div>
                        <h1 className="title">JScribble</h1>
                        <p className="sub-title">The online doodling app</p>
                    </div>
                    
                    {/* Demo video */}
                    <img className="demo-img" src="assets/JScribbleCanvas.gif" alt="demo"/>
                    {/* <div className="demo-img"></div> */}
                </header>
                <section className="landing-section">
                    <h2>Create</h2>
                    <p>
                        Express yourself using our draw board. 
                        Freely draw, sketch out with lines, erase mistakes or smooth out jagged edges, 
                        and stamp with various shapes to complete your work
                    </p>
                </section>

                <Divider />

                <section className="landing-section">
                    <h2>Save & Share</h2>
                    <p>
                        Save and download your work as a .png file or upload your creations to your own gallery. 
                        Choose which pieces you want to show off and share them with the world!
                    </p>
                </section>

                <Divider />

                <section className="landing-section">
                    <h2>Explore</h2>
                    <p>View you own or other people's works in the gallery page</p>
                </section>

                <Divider />

                <section className="landing-section">
                    <h2>How To?</h2>
                    <p>
                        Use the toolbar on the left to change the drawing method and the parameters for that method. 
                        Use the right toolbar to save your drawing and to upload your creation to your gallery
                    </p>
                </section>

                <Divider />

                <section className="landing-section sub-nav flex">
                    { user.username === "guest" ? (
                            <>
                                <Link to="/draw" className="button">Get Started!</Link>
                                <h3>Share your ideas!</h3>
                                <span className="portal-bar flex">
                                    <button className="button" onClick={() => handleOpen("login")}>Login</button>
                                    <p>- or -</p>
                                    <button className="button inverted" onClick={() => handleOpen("signup")}>Signup</button>
                                </span>
                                <h3>See other works!</h3>
                                <Link to="gallery" className="button">Gallery</Link>
                            </>
                        ) : (
                            <>
                                <h3>Share your ideas!</h3>
                                <button className="button">Create</button>

                                <h3>View your profile</h3>
                                <button className="button">Profile</button>

                                <h3>See other works!</h3>
                                <button className="button">Galleries</button>
                            </>
                    )}
                </section>

                <Divider />

                <section className="landing-section">
                    <p>Created By</p>
                    <span className="flex">
                        <img className="dev-img" src="assets/PG-profile-pic.jpg" alt="dev-profile"/>
                        <div className="dev-links flex">
                            <h4>Paul Graham Jr.</h4>
                            <span className="flex">
                                <p className="about flex">
                                A software developer specializing in the development of frontend, backend, and fullstack web applications 
                                as well as fullstack and monolithic desktop applications.

                                Enjoys the act of creating useful, in-depth applications that aid in the day to day for 
                                the end user and further enjoy the mitigation of menial tasks through effieient automation and 
                                other techniques
                                </p>
                                <div className="links flex">
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
                            
                        </div>
                    </span>
                </section>
                <footer className="footer flex">
                    This app was made for one of mintbean's hackathons, check them out
                    <a className="mb-link" href="https://mintbean.io" target="_blank" rel="noreferrer"> here</a>
                </footer>
            </div>
        </>
    )
}