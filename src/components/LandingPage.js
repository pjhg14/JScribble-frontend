import { Link } from "react-router-dom";

export default function LandingPage() {

    /* 
        Description of you application 

        Explain your project's features

        Include a short demo video 

        Tutorial on how to use or interact with your application

        Obvious and clear button to link to your live application 

        "Meet the Engineers" that shows a photo of the you and your team plus links to your LinkedIn, Twitter, and Github 
    */

    // describe the application
    
    
    return(
        <div>
            <header>
                <h1>JScrible</h1>
                <p>the online doodling app</p>
            </header>
            
            <section>Description</section>
            <section>Explain features</section>
            <section>Demo video</section>
            <section>Tutorial</section>
            <section>Login</section>
            <section>
                Draw (without need for signing up/ loging in)
                <Link to="/draw">Start Here</Link>
            </section>
            <section>Meet the Engineers</section>
        </div>
    )
}