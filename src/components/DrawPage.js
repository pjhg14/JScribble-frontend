import Canvas from "./Canvas";

export default function DrawPage() {
    return(
        <>
            <header>
                <h1>Canvas Test</h1>
            </header>
            <main>
                <div>toolbar</div>
                <Canvas />
            </main>
            <footer>repo link</footer>
        </>
    )
}