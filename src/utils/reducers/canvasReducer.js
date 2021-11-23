export const initialCanvasState = {
    context: null,
    canvasRect: null,
    drawing: false,
    drawType: "pen",
    penColor: "#000000",
    fillColor: "#ffffff",
    penSize: 5,
    penCap: "round",
    joinType: "round",
    stampWidth: 5,
    stampHeight: 5,
    pastPaths: []
}

export function canvasReducer(state, action) {
    let pathArray

    switch (action.type) {
        case "init":
            const context = action.payload.getContext("2d")

            context.lineJoin = state.joinType
            context.lineCap = state.penCap
            context.lineWidth = state.penSize
            context.strokeStyle = state.penColor
            context.fillStyle = state.fillColor

            return {
                ...state,
                context,
                canvasRect: context.canvas.getBoundingClientRect()
            }

        case "setCanvasBindingRect":
            // console.log("setting rect", {rect: state.canvasRect})

            return {
                ...state,
                canvasRect: action.payload
            }

        case "startDrawing":
            return {
                ...state,
                drawing: true 
            }

        case "stopDrawing":
            return {
                ...state,
                drawing: false 
            }

        case "setDrawType":
            return {
                ...state,
                drawType: action.payload
            }

        case "setJoinType":
            return {
                ...state,
                joinType: action.payload
            }

        case "setPenCap":
            return {
                ...state,
                penCap: action.payload
            }

        case "setPenSize":
            return {
                ...state,
                penSize: action.payload
            }

        case "setPenColor":
            return {
                ...state,
                penColor: action.payload
            }

        case "setFillColor":
            return {
                ...state,
                fillColor: action.payload
            }
        case "setStampWidth":
            return {
                ...state,
                stampWidth: action.payload
            }
        case "setStampHeight":
            return {
                ...state,
                stampHeight: action.payload
            }
        case "addLastPath":
            pathArray = [...state.pastPaths]
            
            // stack limit (might implement later)
            // if (pathArray.length > 9) pathArray.shift()
            
            pathArray.push(action.payload)
            
            // console.log(pathArray)
            return {
                ...state,
                pastPaths: pathArray
            }
        case "removeLastPath":
            // create new array with all but last path
            pathArray = [...(state.pastPaths)]
            pathArray.pop()

            return {
                ...state,
                pastPaths: pathArray
            }

        case "clearPastPaths":
            return {
                ...state,
                pastPaths: []
            }
        default:
            return state
    }
}