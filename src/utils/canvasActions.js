export function getPointerPosition(event, state) {
    let cursorX
    let cursorY
    const rect = state.canvasRect

    // If on desktop
    if (event.pageX || event.pageY) {
        cursorX = event.pageX - Math.floor(rect.left)
        cursorY = event.pageY - Math.floor(rect.top)
    } else {
        // else on mobile
        cursorX = event.touches[0].pageX - Math.floor(rect.left)
        cursorY = event.touches[0].pageY - Math.floor(rect.top)
    }

    if (cursorX > Math.floor(rect.width)) {
        cursorX = Math.floor(rect.width)
    }

    if (cursorY > Math.floor(rect.height)) {
        cursorY = Math.floor(rect.height)
    }

    return { cursorX, cursorY }
}

// ---------------------------------------------------------------------------------------------------/
// Freeform paint functions ///////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------------------------/
export function drawStart(event, state, dispatch) {
    // console.log("draw start")
    const {cursorX, cursorY} = getPointerPosition(event, state)
    
    dispatch({type: "startDrawing"})
    state.context.beginPath()
    state.context.lineTo(cursorX, cursorY)
    state.context.stroke()
}  

export function paint(event, state) {
    if (!state.drawing) return

    // console.log("drawing...")
    const {cursorX, cursorY} = getPointerPosition(event, state)
        
    state.context.lineTo(cursorX, cursorY)
    state.context.stroke()
    state.context.moveTo(cursorX, cursorY)
}

export function drawEnd(state, dispatch) {
    if (!state.drawing) return

    // console.log("draw end")
    dispatch({type: "stopDrawing"})
    // Begin end last path
    state.context.stroke()
    state.context.closePath()
}
// ---------------------------------------------------------------------------------------------------/
// ---------------------------------------------------------------------------------------------------/

// ---------------------------------------------------------------------------------------------------/
// Line draw functions ////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------------------------/
export function lineStart(event, state, dispatch) {
    // console.log("draw start")
    const {cursorX, cursorY} = getPointerPosition(event, state)

    dispatch({type: "startDrawing"})
    state.context.beginPath()
    state.context.moveTo(cursorX, cursorY)
}

export function lineEnd(event, state, dispatch) {
    if (!state.drawing) return

    // console.log("draw start")
    const {cursorX, cursorY} = getPointerPosition(event, state)

    // console.log("draw end")
    dispatch({type: "stopDrawing"})
    // Begin new path to end last one
    state.context.lineTo(cursorX, cursorY)
    state.context.stroke()
    state.context.closePath()
}
// ---------------------------------------------------------------------------------------------------/
// ---------------------------------------------------------------------------------------------------/

// ---------------------------------------------------------------------------------------------------/
// Eraser functions ///////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------------------------/
export function eraseStart(event, state, dispatch) {
    const {cursorX, cursorY} = getPointerPosition(event, state)

    dispatch({type: "startDrawing"})

    if (state.penCap === "round") {
        clearCircle(state.context,cursorX, cursorY, Math.floor(state.penSize / 2))
    } else {
        clearRect(state.context, cursorX, cursorY, state.penSize)
    }    
}

export function eraseMove(event, state) {
    if (!state.drawing) return

    // console.log("drawing...")
    const {cursorX, cursorY} = getPointerPosition(event, state)
    
    if (state.penCap === "round") {
        clearCircle(state.context,cursorX, cursorY, Math.floor(state.penSize / 2))
    } else {
        clearRect(state.context, cursorX, cursorY, state.penSize)
    }    
}

export function eraseEnd(state, dispatch) {
    if (!state.drawing) return

    // console.log("draw end")
    dispatch({type: "stopDrawing"})
}
// ---------------------------------------------------------------------------------------------------/
// ---------------------------------------------------------------------------------------------------/

// ---------------------------------------------------------------------------------------------------/
// stamp functions ////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------------------------/
// TODO: merge all stamp methods into one
export function rectStamp(event, state) {
    if (event.type === 'mouseout') return

    const {cursorX, cursorY} = getPointerPosition(event, state)
    
    state.context.beginPath()
    
    state.context.rect(
        cursorX - Math.floor(state.stampWidth / 2), 
        cursorY - Math.floor(state.stampHeight / 2), 
        state.stampWidth, 
        state.stampHeight
    )
    state.context.fill()
    state.context.stroke()
    state.context.closePath()
}

export function ellipseStamp(event, state) {
    if (event.type === 'mouseout') return

    const {cursorX, cursorY} = getPointerPosition(event, state)
    
    state.context.beginPath()
    
    state.context.ellipse(
        cursorX, 
        cursorY,
        Math.floor(state.stampWidth / 2), 
        Math.floor(state.stampHeight / 2),
        0,
        0,
        2 * Math.PI
    )
    state.context.fill()
    state.context.stroke()
    state.context.closePath()
}
// ---------------------------------------------------------------------------------------------------/
// ---------------------------------------------------------------------------------------------------/

function clearCircle(context,x,y,radius) {
	context.save();
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.clip();
	context.clearRect(x-radius,y-radius,radius*2,radius*2);
	context.restore();
}

function clearRect(context, x, y, width) {
    context.clearRect(
        x - Math.floor(width / 2), 
        y - Math.floor(width / 2),
        width,
        width
    )
}

// // fills all similarly colored adjacent pixels with a target color (target color defaults to black rgba(0,0,0,1))
// function fillCanvas(context, clickX, clickY) {
//     console.log("filling...")
//     /* 
//     source: Wikipedia (flood fill)
//     fn fill(x, y):
//         if not Inside(x, y) then return
//         let s = new empty queue or stack
//         Add (x, x, y, 1) to s
//         Add (x, x, y - 1, -1) to s
//         while s is not empty:
//             Remove an (x1, x2, y, dy) from s
//             let x = x1
//             if Inside(x, y):
//             while Inside(x - 1, y):
//                 Set(x - 1, y)
//                 x = x - 1
//             if x < x1:
//             Add (x, x1-1, y-dy, -dy) to s
//             while x1 < x2:
//             while Inside(x1, y):
//                 Set(x1, y)
//                 x1 = x1 + 1
//             Add (x, x1 - 1, y+dy, dy) to s
//             if x1 - 1 > x2:
//                 Add (x2 + 1, x1 - 1, y-dy, -dy)
//             while x1 < x2 and not Inside(x1, y):
//                 x1 = x1 + 1
//             x = x1
//     */

//     // Set-up
//     const queue = []
//     const width = context.canvas.width
//     const height = context.canvas.height
//     let imageData = context.getImageData(0, 0, width, height)

//     const clickPosition = getPosition(clickX, clickY, width)

//     if (imageData.data[clickPosition] === undefined) return

//     // Set color to change (all colors equal to clickPosition color)
//     const insideColor = getColorFromPosition(imageData, clickPosition)
//     console.log({insideColor})

//     // Execute
//     queue.push({x1: clickX, x2: clickX, y: clickY, dy: 1})
//     queue.push({x1: clickX, x2: clickX, y: clickY - 1, dy: -1})

//     // console.log(inside(context,imageData, 100, 50, insideColor))

//     let i = 0
//     while (queue.length > 0 && i < 1000) {
//         console.log("Main loop")
//         console.log({i})
//         console.log(queue)

//         let {x1, x2, y, dy} = queue.shift()
//         let x = x1

//         if (inside(context, imageData, x, y, insideColor)) {
//             let z = 0
//             while (inside(context, imageData, x - 1, y, insideColor) &&  z < 500) {
//                 console.log("Sub loop 1")

//                 set(context, imageData, x - 1, y)
//                 x--
//                 z++
//             }
//         }

//         if (x < x1) {
//             queue.push({x1: x, x2: x1 - 1, y: y - dy, dy: -dy})
//         }

//         while (x1 < x2) {
//             while (inside(context, imageData, x1, y, insideColor)) {
//                 console.log("Sub loop 2")

//                 set(context, imageData, x1, y)
//                 x1++
//             }

//             queue.push({x1: x, x2: x1 - 1, y: y + dy, dy: dy})

//             if (x1 - 1 > x2) {
//                 queue.push({x1: x2 + 1, x2: x1 - 1, y: y - dy, dy: -dy})
//             }

//             while (x1 < x2 && !inside(context, imageData, x1, y, insideColor)) {
//                 console.log("Sub loop 3")

//                 x1 = x1 + 1
//             }

//             x = x1
//         }
//     }

//     return imageData
// }

// function inside(context, imageData, x, y, insideColor) {
//     const width = context.canvas.width
//     const height = context.canvas.height

//     if (x > width || y > height) return false

//     const position = getPosition(x, y, width)

//     const positionColor = {
//         red: imageData.data[position], 
//         green:imageData.data[position + 1],
//         blue: imageData.data[position + 2],
//         alpha: imageData.data[position + 3]
//     }

//     console.log({positionColor})

//     return (
//         positionColor.red === insideColor.red 
//         &&
//         positionColor.blue === insideColor.blue 
//         &&
//         positionColor.green === insideColor.green 
//         &&
//         positionColor.alpha === insideColor.alpha 
//     )
// }

// function set(context, imageData, x, y) {
//     const position = getPosition(x, y, context.canvas.width)
//     const { red, green, blue } = hexToRGB(context.fillStyle)

//     imageData.data[position] = red
//     imageData.data[position + 1] = blue
//     imageData.data[position + 2] = green
//     imageData.data[position + 3] = 255

//     return imageData
// }

// function getPosition(x, y, width) {
//     return  y * (width * 4) + x * 4
// }

// function getColorFromPosition(imageData, position) {
//     // console.log(imageData)

//     return {
//         red: imageData.data[position], 
//         green:imageData.data[position + 1],
//         blue: imageData.data[position + 2],
//         alpha: imageData.data[position + 3]
//     }
// }

// function hexToRGB(hex) {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

//     return result ? {
//       red: parseInt(result[1], 16),
//       green: parseInt(result[2], 16),
//       blue: parseInt(result[3], 16)
//     } : {
//       red: 0,
//       green: 0,
//       blue: 0
//     }
// }