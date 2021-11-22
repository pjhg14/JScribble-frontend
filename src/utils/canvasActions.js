export function getPointerPosition(event, context) {
    let cursorX
    let cursorY
    const rect = context.canvas.getBoundingClientRect()

    // If on desktop
    if (event.pageX || event.pageY) {
        cursorX = event.pageX - Math.floor(rect.left)
        cursorY = event.pageY - Math.floor(rect.top)
    } else {
        // else on mobile
        cursorX = event.touches[0].pageX - Math.floor(rect.left)
        cursorY = event.touches[0].pageY - Math.floor(rect.top)
    }

    if (cursorX > context.canvas.width) {
        cursorX = context.canvas.width
    }

    if (cursorY > context.canvas.height) {
        cursorY = context.canvas.height
    }

    return { cursorX, cursorY }
}

// ---------------------------------------------------------------------------------------------------/
// Freeform paint functions ///////////////////////////////////////////////////////////////////////////
// ---------------------------------------------------------------------------------------------------/
export function drawStart(event, state, dispatch) {
    // console.log("draw start")
    const {cursorX, cursorY} = getPointerPosition(event, state.context)
    
    dispatch({type: "startDrawing"})
    state.context.beginPath()
    state.context.lineTo(cursorX, cursorY)
    state.context.stroke()
}  

export function paint(event, state) {
    if (!state.drawing) return

    // console.log("drawing...")
    const {cursorX, cursorY} = getPointerPosition(event, state.context)
        
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
    const {cursorX, cursorY} = getPointerPosition(event, state.context)

    dispatch({type: "startDrawing"})
    state.context.beginPath()
    state.context.moveTo(cursorX, cursorY)
}

export function lineEnd(event, state, dispatch) {
    if (!state.drawing) return

    // console.log("draw start")
    const {cursorX, cursorY} = getPointerPosition(event, state.context)

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
    const {cursorX, cursorY} = getPointerPosition(event, state.context)

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
    const {cursorX, cursorY} = getPointerPosition(event, state.context)
    
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

    const {cursorX, cursorY} = getPointerPosition(event, state.context)
    
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

    const {cursorX, cursorY} = getPointerPosition(event, state.context)
    
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