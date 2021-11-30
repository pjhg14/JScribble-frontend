import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useReducer, useContext, useState, useCallback } from "react";
import { UserContext } from "../../App";
import { 
    drawEnd, drawStart, ellipseStamp, eraseEnd, 
    eraseMove, eraseStart, lineEnd, lineStart, paint, rectStamp 
} from "../../utils/canvasActions";
import { canvasReducer, initialCanvasState } from "../../utils/reducers/canvasReducer";
import { useResizeObserver } from "../../utils/useResizeObserver";
import ImageForm from "../ImageForm";
import Modal from "../modal/Modal";
import Portal from "../Portal";
import Actions from "./Actions";
import Tools from "./Tools";

export default function Canvas() {
    const canvas = useRef(null)
    const [state, canvasDispatch] = useReducer(canvasReducer, initialCanvasState)
    const { user } = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [actionType, setActionType] = useState("")

    const setCanvasBoundingBox = useCallback(entries => {
        for (const entry of entries) {
            if (process.env.NODE_ENV !== "production") {
                console.log("Canvas Resize Callback called")
            }
    
            canvasDispatch({
                type: "setCanvasBindingRect",
                payload: entry.target.getBoundingClientRect()
            })

            // console.log(canvas.current)
        }
    },[])

    useResizeObserver(setCanvasBoundingBox, canvas)

    useEffect(()=> {
        canvasDispatch({
            type: "init",
            payload: canvas.current
        })
    },[])

    function handleActionDown(event) {
        enforceContextState()

        switch (state.drawType) {
            case "pen":
                drawStart(event, state, canvasDispatch)
                break;
            case "line":
                lineStart(event, state, canvasDispatch)
                break;
            case "fill":
                // None, just need the case so draw type does not reset
                break;
            case "erase":
                eraseStart(event, state, canvasDispatch)
                break;
            case "rectangle":
                // None, just need the case so draw type does not reset
                break;
            case "ellipse":
                // None, just need the case so draw type does not reset
                break;
            default:
                canvasDispatch({
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
                canvasDispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break;
        }
    }

    function handleActionUp(event) {
        switch (state.drawType) {
            case "pen":
                drawEnd(state, canvasDispatch)
                break;
            case "line":
                lineEnd(event, state, canvasDispatch)
                break
            case "fill":
                if (event.type === 'mouseout') return

                // Fill(event)
                break
            case "erase":
                eraseEnd(state, canvasDispatch)
                break
            case "rectangle":
                rectStamp(event, state)
                break
            case "ellipse":
                ellipseStamp(event, state)
                break
            default:
                canvasDispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break
        }

        // if end of drawing was NOT due to the mouse leaving the canvas
        if (event.type !== 'mouseout') {
            // add drawn path to last path
            canvasDispatch({
                type: "addLastPath",
                payload: state.context.getImageData(0, 0, state.canvasRect.width, state.canvasRect.height)
            })
        }
    }

    function enforceContextState() {
        state.context.lineWidth = state.penSize
        state.context.lineCap = state.penCap
        state.context.lineJoin = state.joinType
        state.context.strokeStyle = state.penColor
        state.context.fillStyle = state.fillColor
    }

    function handleClose() {
        setModalOpen(false)
        setActionType("")
    }

    function handleOpen(type) {
        setActionType(type)
        setModalOpen(true)   
    }

    return(
        <>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                { modalOpen && 
                    <Modal handleClose={handleClose}>
                        {/* switch between portal and upload / save */}
                        { user.username === "guest" && actionType !== "save" ? (
                            <Portal authType={actionType} closeModal={handleClose}/>    
                        ) : (
                            <ImageForm actionType={actionType} canvasData={canvas.current.toDataURL()} closeModal={handleClose}/>
                        )}
                    </Modal>
                }
            </AnimatePresence>
            <div className="draw-page grid">
                <Tools state={state} canvasDispatch={canvasDispatch} />
                <canvas 
                    className="board" 
                    ref={canvas}
                    width={state.canvasRect?.width ? state.canvasRect.width : "1600"}
                    height={state.canvasRect?.height ? state.canvasRect.height : "900"}
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
                <Actions openModal={handleOpen}/>
            </div>
        </>
    )
}