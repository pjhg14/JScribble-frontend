import { useEffect, useRef, useReducer } from "react";
import { 
    drawEnd, drawStart, ellipseStamp, eraseEnd, eraseMove, eraseStart, 
    getPointerPosition, lineEnd, lineStart, paint, rectStamp 
} from "../utils/canvasActions";
import { canvasReducer, initialCanvasState } from "../utils/reducers/canvasReducer";
import RangePicker from "./RangePicker";

export default function Canvas() {
    const canvas = useRef(null)
    const [state, dispatch] = useReducer(canvasReducer, initialCanvasState)

    useEffect(()=>{
        dispatch({
            type: "init",
            payload: canvas.current
        })

        // TODO:
        // there's an api called ResizeObserver that should help. 
        // basically just observe the canvas element and change canvas.width to 
        // canvas.getBoundingClientRect().width * window.devicePixelRatio and do the same with the height
    },[])

    // ---------------------------------------------------------------------------------------------------/
    // MouseEvent handlers ////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handleActionDown(event) {
        enforceContextState()

        switch (state.drawType) {
            case "pen":
                drawStart(event, state, dispatch)
                break;
            case "line":
                lineStart(event, state, dispatch)
                break;
            case "fill":
                // None, just need the case so draw type does not reset
                break;
            case "erase":
                eraseStart(event, state, dispatch)
                break;
            case "rectangle":
                // None, just need the case so draw type does not reset
                break;
            case "ellipse":
                // None, just need the case so draw type does not reset
                break;
            default:
                dispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break;
        }
    }

    function handleActionMove(event) {
        switch (state.drawType) {
            case "pen":
                paint(event, state)
                break;
            case "line":
                // None, just need the case so draw type does not reset
                break;
            case "fill":
                // None, just need the case so draw type does not reset
                break;
            case "erase":
                eraseMove(event, state)
                break;
            case "rectangle":
                // None, just need the case so draw type does not reset
                break;
            case "ellipse":
                // None, just need the case so draw type does not reset
                break;
            default:
                dispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break;
        }
    }

    function handleActionUp(event) {
        switch (state.drawType) {
            case "pen":
                drawEnd(state, dispatch)
                break;
            case "line":
                lineEnd(event, state, dispatch)
                break
            case "fill":
                if (event.type === 'mouseout') return

                // Fill(event)
                break
            case "erase":
                eraseEnd(state, dispatch)
                break
            case "rectangle":
                rectStamp(event, state)
                break
            case "ellipse":
                ellipseStamp(event, state)
                break
            default:
                dispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break
        }

        // if end of drawing was NOT due to the mouse leaving the canvas
        if (event.type !== 'mouseout') {
            // add drawn path to last path
            dispatch({
                type: "addLastPath",
                payload: state.context.getImageData(0, 0, canvas.current.width, canvas.current.height)
            })
        }
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    // ---------------------------------------------------------------------------------------------------/
    // unsorted ///////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function enforceContextState() {
        state.context.lineWidth = state.penSize
        state.context.lineCap = state.penCap
        state.context.lineJoin = state.joinType
        state.context.strokeStyle = state.penColor
        state.context.fillStyle = state.fillColor
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/
    
    // ---------------------------------------------------------------------------------------------------/
    // fill function //////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handleFill(event) {
        const {cursorX, cursorY} = getPointerPosition(event, state.context)

        state.context.putImageData(fillCanvas(state.context, cursorX, cursorY), 0, 0)
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    

    // ---------------------------------------------------------------------------------------------------/
    // Canvas functions ///////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handleCanvasClear() {
        state.context.clearRect(0, 0, canvas.current.width, canvas.current.height)

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
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    // ---------------------------------------------------------------------------------------------------/
    // Canvas Context state change ////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handlePenWidthChange(event) {
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

    function handleFillColorChange(event) {
        dispatch({
            type: "setFillColor",
            payload: event.target.value
        })
    }

    function handleCapChange(event) {
        dispatch({
            type: "setPenCap",
            payload: event.target.value
        })
    }

    function handleDrawTypeChange(event) {
        dispatch({
            type: "setDrawType",
            payload: event.target.value
        })
    }

    function handleStampWidthChange(event) {
        dispatch({
            type: "setStampWidth",
            payload: event.target.value
        })
    }

    function handleStampHeightChange(event) {
        dispatch({
            type: "setStampHeight",
            payload: event.target.value
        })
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    // console.log()

    return(
        <>
            <canvas 
                className="board" 
                ref={canvas}
                width="1000" 
                height="500"
                // Desktop Mouse Events
                onMouseDown={handleActionDown}
                onMouseMove={handleActionMove}
                onMouseUp={handleActionUp}
                onMouseOut={handleActionUp}

                // Mobile/Tablet Touch events (Does not work for some reason???)
                onTouchStart={handleActionDown}
                onTouchMove={handleActionMove}    
                onTouchEnd={handleActionUp}>
            </canvas>
            <div className="tools">
                <button 
                    disabled={state.pastPaths.length <= 0}
                    onClick={handleCanvasUndo}>
                        Undo
                </button>
                <button onClick={handleCanvasClear}>Clear Board</button>

                <RangePicker label="Stroke Width" value={state.penSize} setValue={handlePenWidthChange}/>

                <label htmlFor="line-picker">Stroke Color</label>
                <input 
                    type="color"   
                    id="line-picker"
                    value={state.penColor}
                    onChange={handlePenColorChange}
                />

                <label htmlFor="fill-picker">Fill Color</label>
                <input 
                    type="color"   
                    id="fill-picker"
                    value={state.fillColor}
                    onChange={handleFillColorChange}
                />

                <label htmlFor="draw-type">Draw options</label>
                <select id="draw-type" value={state.drawType} onChange={handleDrawTypeChange}>
                    <optgroup label="Draw">
                        <option value="pen">Pen</option>
                        <option value="line">Lines</option>
                        <option value="fill">Fill</option>
                        <option value="erase">Erase</option>
                    </optgroup>
                    <optgroup label="Stamp">
                        <option value="rectangle">Rectangle</option>
                        <option value="ellipse">Ellipse</option>
                    </optgroup>
                </select>

                <label htmlFor="pen-cap">Pen Cap:</label>
                <select id="pen-cap" onChange={handleCapChange}>
                    <option value="round">rounded</option>
                    <option value="square">square</option>
                </select>

                <RangePicker label="Stamp Height" value={state.stampWidth} setValue={handleStampWidthChange} />

                <RangePicker label="Stamp Width" value={state.stampHeight} setValue={handleStampHeightChange} />
            </div>
        </>
    )
}

// TODO: move functions into utility folder


// fills all similarly colored adjacent pixels with a target color (target color defaults to black rgba(0,0,0,1))
function fillCanvas(context, clickX, clickY) {
    console.log("filling...")
    /* 
    source: Wikipedia (flood fill)
    fn fill(x, y):
        if not Inside(x, y) then return
        let s = new empty queue or stack
        Add (x, x, y, 1) to s
        Add (x, x, y - 1, -1) to s
        while s is not empty:
            Remove an (x1, x2, y, dy) from s
            let x = x1
            if Inside(x, y):
            while Inside(x - 1, y):
                Set(x - 1, y)
                x = x - 1
            if x < x1:
            Add (x, x1-1, y-dy, -dy) to s
            while x1 < x2:
            while Inside(x1, y):
                Set(x1, y)
                x1 = x1 + 1
            Add (x, x1 - 1, y+dy, dy) to s
            if x1 - 1 > x2:
                Add (x2 + 1, x1 - 1, y-dy, -dy)
            while x1 < x2 and not Inside(x1, y):
                x1 = x1 + 1
            x = x1
    */

    // Set-up
    const queue = []
    const width = context.canvas.width
    const height = context.canvas.height
    let imageData = context.getImageData(0, 0, width, height)

    const clickPosition = getPosition(clickX, clickY, width)

    if (imageData.data[clickPosition] === undefined) return

    // Set color to change (all colors equal to clickPosition color)
    const insideColor = getColorFromPosition(imageData, clickPosition)
    console.log({insideColor})

    // Execute
    queue.push({x1: clickX, x2: clickX, y: clickY, dy: 1})
    queue.push({x1: clickX, x2: clickX, y: clickY - 1, dy: -1})

    // console.log(inside(context,imageData, 100, 50, insideColor))

    let i = 0
    while (queue.length > 0 && i < 1000) {
        console.log("Main loop")
        console.log({i})
        console.log(queue)

        let {x1, x2, y, dy} = queue.shift()
        let x = x1

        if (inside(context, imageData, x, y, insideColor)) {
            let z = 0
            while (inside(context, imageData, x - 1, y, insideColor) &&  z < 500) {
                console.log("Sub loop 1")

                set(context, imageData, x - 1, y)
                x--
                z++
            }
        }

        if (x < x1) {
            queue.push({x1: x, x2: x1 - 1, y: y - dy, dy: -dy})
        }

        while (x1 < x2) {
            while (inside(context, imageData, x1, y, insideColor)) {
                console.log("Sub loop 2")

                set(context, imageData, x1, y)
                x1++
            }

            queue.push({x1: x, x2: x1 - 1, y: y + dy, dy: dy})

            if (x1 - 1 > x2) {
                queue.push({x1: x2 + 1, x2: x1 - 1, y: y - dy, dy: -dy})
            }

            while (x1 < x2 && !inside(context, imageData, x1, y, insideColor)) {
                console.log("Sub loop 3")

                x1 = x1 + 1
            }

            x = x1
        }
    }

    return imageData
}

function inside(context, imageData, x, y, insideColor) {
    const width = context.canvas.width
    const height = context.canvas.height

    if (x > width || y > height) return false

    const position = getPosition(x, y, width)

    const positionColor = {
        red: imageData.data[position], 
        green:imageData.data[position + 1],
        blue: imageData.data[position + 2],
        alpha: imageData.data[position + 3]
    }

    console.log({positionColor})

    return (
        positionColor.red === insideColor.red 
        &&
        positionColor.blue === insideColor.blue 
        &&
        positionColor.green === insideColor.green 
        &&
        positionColor.alpha === insideColor.alpha 
    )
}

function set(context, imageData, x, y) {
    const position = getPosition(x, y, context.canvas.width)
    const { red, green, blue } = hexToRGB(context.fillStyle)

    imageData.data[position] = red
    imageData.data[position + 1] = blue
    imageData.data[position + 2] = green
    imageData.data[position + 3] = 255

    return imageData
}

function getPosition(x, y, width) {
    return  y * (width * 4) + x * 4
}

function getColorFromPosition(imageData, position) {
    // console.log(imageData)

    return {
        red: imageData.data[position], 
        green:imageData.data[position + 1],
        blue: imageData.data[position + 2],
        alpha: imageData.data[position + 3]
    }
}

function hexToRGB(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : {
      red: 0,
      green: 0,
      blue: 0
    }
}