export const initialCanvasState = {
    context: null,
    drawing: false,
}

export function canvasReducer(state, action) {

    switch (action.type) {
        case "init":
            const context = action.payload.getContext("2d")

            context.lineJoin = "round"
            context.lineCap = "round"
            context.lineWidth = 5
            context.strokeStyle = "black"
            context.fillStyle = "white"

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

        case "setLineJoin":
            state.context.lineJoin = action.payload

            return state

        case "setLineCap":
            state.context.lineCap = action.payload
    
            return state

        case "setLineWidth":
            state.context.lineWidth = action.payload

            return state

        case "setStrokeStyle":
            state.context.lineJoin = action.payload

            return state

        case "setFillStyle":
            state.context.lineJoin = action.payload

            return state
    
        default:
            return state
    }
}