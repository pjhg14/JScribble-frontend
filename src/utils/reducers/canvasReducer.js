export const initialCanvasState = {
    context: null,
    drawing: false,
    penColor: "#000000",
    fillColor: "#ffffff",
    penSize: 5,
    penCap: "round",
    joinType: "round",
    backgroundColor: "#ffffff",
    pastPaths: []
}

export function canvasReducer(state, action) {
    let pathArray

    switch (action.type) {
        case "init":
            const context = action.payload.getContext("2d")

            context.lineJoin = "round"
            context.lineCap = "round"
            context.lineWidth = 5
            context.strokeStyle = "#000000"
            context.fillStyle = "#ffffff"

            return {
                ...state,
                context
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