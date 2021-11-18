import { useState, useEffect, useRef } from "react";

export default function Canvas() {
    const [drawing, setDrawing] = useState(false)
    const [lineCap, setLineCap] = useState("round")
    const [lineWidth, setLineWidth] = useState(5)
    const [strokeColor, setStrokeColor] = useState("#fff")

    const canvas = useRef(null)
    const context = useRef(null)

    useEffect(()=>{
        // TODO: change getElementById to useRef
        context.current = canvas.current.getContext("2d")
        context.current.lineJoin = "round"
        context.current.lineCap = "round"
        context.current.lineWidth = 5
        // Supports hex values
        context.current.strokeStyle = "black"
        context.current.fillStyle = "blue"

        // console.log(drawBoard)
    },[])

    function handlePaint(e) {
        if (!drawing) return

        const cursorX = e.pageX - canvas.current.offsetLeft
        const cursorY = e.pageY - canvas.current.offsetTop
            
        context.current.lineTo(cursorX, cursorY)
        context.current.stroke()
        context.current.beginPath()
        context.current.moveTo(cursorX, cursorY)
    }

    function handleDrawStart(e) {
        const cursorX = e.pageX - canvas.current.offsetLeft
        const cursorY = e.pageY - canvas.current.offsetTop

        setDrawing(true)
        context.current.lineTo(cursorX, cursorY)
        context.current.stroke()
    }

    function handleDrawEnd() {
        setDrawing(false)
        // Begin new path to end last one
        context.current.closePath()
        context.current.beginPath()
    }

    function handleCanvasClear() {
        context.current.clearRect(0, 0, canvas.current.width, canvas.current.height)
    }
    function floodFill(imageData) {
        /* 
        Flood-fill (node):
            1. Set Q to the empty queue or stack.
            2. Add node to the end of Q.
            3. While Q is not empty:
            4.   Set n equal to the first element of Q.
            5.   Remove first element from Q.
            6.   If n is Inside:
                    Set the n
                    Add the node to the west of n to the end of Q.
                    Add the node to the east of n to the end of Q.
                    Add the node to the north of n to the end of Q.
                    Add the node to the south of n to the end of Q.
            7. Continue looping until Q is exhausted.
            8. Return.
        */
        const queue = [...imageData]

    }

    // console.log(context.current)

    return(
        <>
            <canvas 
                className="board" 
                ref={canvas}
                width="1000" 
                height="500"
                // Desktop Mouse Events
                onMouseDown={handleDrawStart}
                onMouseUp={handleDrawEnd}
                onMouseMove={handlePaint}

                // Mobile/Tablet Touch events (Does not work for some reason???)
                onTouchStart={handleDrawStart}
                onTouchEnd={handleDrawEnd}
                onTouchMove={handlePaint}

                // onClick={e => console.log(e)}
                >    
            </canvas>
            <div className="board-options">
                <button onClick={handleCanvasClear}>Clear Board</button>

                <label htmlFor="stroke-width">Stroke Width</label>
                <input type="number" id="stroke-width" min="1" max="47"/>

                <label htmlFor="color-picker">Stroke Color</label>
                <input type="color" id="color-picker"/>

                <label htmlFor="draw-type">Draw options</label>
                <select id="draw-type">
                    <optgroup label="Draw">
                        <option value="pen">Pen</option>
                        <option>Lines</option>
                    </optgroup>
                    <optgroup label="Stamp">
                        <option value="rectangle">Rectangle</option>
                        <option value="circle">Circle</option>
                    </optgroup>
                </select>
            </div>
        </>
    )
}