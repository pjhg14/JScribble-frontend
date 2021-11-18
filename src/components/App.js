// import { useEffect, useRef, useState } from "react";

import Canvas from "./Canvas";

export default function App() {
    // const mousePos = {x: null, y: null}
    
    // console.log(drawing)

    return (
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