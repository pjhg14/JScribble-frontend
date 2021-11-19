import { useEffect, useRef, useReducer } from "react";
import { canvasReducer, initialCanvasState } from "../utils/reducers/canvasReducer";
import PenSizePicker from "./PenSizePicker";

export default function Canvas() {
    const canvas = useRef(null)
    const [state, dispatch] = useReducer(canvasReducer, initialCanvasState)

    useEffect(()=>{
        dispatch({
            type: "init",
            payload: canvas.current
        })

        // TODO: change getElementById to useRef
        // context.current = canvas.current.getContext("2d")
        // context.current.lineJoin = "round"
        // context.current.lineCap = "round"
        // context.current.lineWidth = 5
        // // Supports hex values
        // context.current.strokeStyle = "black"
        // context.current.fillStyle = "blue"

        // console.log(context.current.getImageData(0,0,canvas.current.width, canvas.current.height).data)
    },[])

    function handlePaint(e) {
        if (!state.drawing) return

        // console.log("drawing...")

        let cursorX
        let cursorY

        // If on desktop
        if (e.pageX || e.pageY) {
            cursorX = e.pageX - canvas.current.offsetLeft
            cursorY = e.pageY - canvas.current.offsetTop
        } else {
            // else on mobile
            console.log(e.touches)
            cursorX = e.touches[0].pageX - canvas.current.offsetLeft
            cursorY = e.touches[0].pageY - canvas.current.offsetTop
        }
        
        
        // seems like the most performant way to draw in react for some reason???
        state.context.lineTo(cursorX, cursorY)
        state.context.stroke()
        state.context.moveTo(cursorX, cursorY)
    }

    function handleDrawStart(e) {
        // console.log("draw start")
        let cursorX
        let cursorY

        // If on desktop
        if (e.pageX || e.pageY) {
            cursorX = e.pageX - canvas.current.offsetLeft
            cursorY = e.pageY - canvas.current.offsetTop
        } else {
            // else on mobile
            cursorX = e.touches[0].pageX - canvas.current.offsetLeft
            cursorY = e.touches[0].pageY - canvas.current.offsetTop
        }

        // Enforce context state
        state.context.lineWidth = state.penSize
        state.context.lineCap = state.penCap
        state.context.lineJoin = state.joinType
        state.context.strokeStyle = state.penColor
        state.context.fillStyle = state.fillColor

        dispatch({type: "startDrawing"})
        state.context.beginPath()
        state.context.lineTo(cursorX, cursorY)
        state.context.stroke()
    }

    function handleDrawEnd(e) {
        if (!state.drawing) return

        // console.log("draw end")
        dispatch({type: "stopDrawing"})
        // Begin new path to end last one
        state.context.stroke()
        state.context.closePath()

        // console.log(e)

        // if end of drawing was NOT due to the mouse leaving the canvas
        if (e.type != 'mouseout') {
            // add drawn path to last path
            dispatch({
                type: "addLastPath",
                payload: state.context.getImageData(0, 0, canvas.current.width, canvas.current.height)
            })
        }
        
    }

    function handleCanvasClear() {
        state.context.fillStyle = state.backgroundColor
        state.context.fillRect(0, 0, canvas.current.width, canvas.current.height)
        state.context.fillStyle = state.fillColor

        dispatch({
            type: "clearPastPaths"
        })
    }

    function handleCanvasUndo() {
        // if last action is end of stack
        if (state.pastPaths.length <= 1) {
            handleCanvasClear()
            return
        }

        // get last saved imageData
        const imageData = state.pastPaths[state.pastPaths.length - 2]
        state.context.putImageData(imageData, 0, 0)

        dispatch({
            type: "removeLastPath"
        })
    }

    function handleLineWidthChange(event) {
        dispatch({
            type: "setPenSize",
            payload: event.target.value
        })
    }

    function handlePenColorChange(event) {
        dispatch({
            type: "setPenColor",
            payload: event.target.value
        })
    }

    // console.log()

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
                onMouseOut={handleDrawEnd}

                // Mobile/Tablet Touch events (Does not work for some reason???)
                onTouchStart={handleDrawStart}
                onTouchEnd={handleDrawEnd}
                onTouchMove={handlePaint}>    
            </canvas>
            <div className="tools">
                <button 
                    disabled={state.pastPaths.length <= 0}
                    onClick={handleCanvasUndo}>
                        Undo
                </button>
                {/* <button>Redo</button> */}
                <button onClick={handleCanvasClear}>Clear Board</button>

                <PenSizePicker penSize={state.penSize} setPenSize={handleLineWidthChange}/>

                <label htmlFor="color-picker">Stroke Color</label>
                <input 
                    type="color"   
                    id="color-picker" 
                    onChange={handlePenColorChange}
                />

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

// TODO: move functions into utility folder

// fills all similarly colored adjacent pixels with a target color (target color defaults to black rgba(0,0,0,1))
function floodFill(context, targetX, targetY, { red = 0, green = 0, blue = 0, alpha = 255 }) {
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

    const queue = []

    // color data is saved as 4 entries in the imageData array this constant is to help with that
    const COORD_LENGTH = 4
    
    const width = context.canvas.width
    const height = context.canvas.height
    const imageData = context.getImageData(0, 0, width, height)

    const targetPosition = targetY * (width * COORD_LENGTH) + targetX * COORD_LENGTH
    queue.push(targetPosition)

    // Set color to change (all colors equal to targetPosition color)
    const targetColor = {
        red: imageData[targetPosition], 
        greeen:imageData[targetPosition + 1],
        blue: imageData[targetPosition + 2],
        alpha: imageData[targetPosition + 3]
    }

    while(queue.length !== 0) {
        // get current position from queue
        let currentPosition = queue.shift()

        // Extract color values from current position
        let currentPixelColor = {
            red: imageData[currentPosition], 
            greeen:imageData[currentPosition + 1],
            blue: imageData[currentPosition + 2],
            alpha: imageData[currentPosition + 3]
        }

        // If current pixel color matches the target color
        if (colorMatches(currentPixelColor, targetColor)) {
            // set current pixel to target color
            imageData[currentPosition] = red
            imageData[currentPosition + 1] = green
            imageData[currentPosition + 2] = blue
            imageData[currentPosition + 3] = alpha

            // add west pixel to queue
            queue.push(currentPosition - 4)

            // add east pixel to queue
            queue.push(currentPosition + 4)

            // add north pixel to queue
            queue.push(currentPosition - width)

            // add south pixel to queue
            queue.push(currentPosition + width)
        }
    }

    return imageData
}

function colorMatches(pixel, target) {
    return pixel.red === target.red && pixel.green === target.green && pixel.blue === target.blue && pixel.alpha === target.alpha
}