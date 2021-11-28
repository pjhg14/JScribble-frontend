import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useReducer, useContext, useState } from "react";
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
    const [state, userDispatch] = useReducer(canvasReducer, initialCanvasState)
    const { user } = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [actionType, setActionType] = useState("")

    function setCanvasBoundingBox(entries) {
        console.log("RSO Callback called")

        userDispatch({
            type: "setCanvasBindingRect",
            payload: entries[0].target.getBoundingClientRect()
        })

        if (canvas.current) {
            canvas.current.width = state.canvasRect.width
            canvas.current.height = state.canvasRect.height
        }
        
    }

    useResizeObserver(setCanvasBoundingBox, canvas)

    useEffect(()=> {
        userDispatch({
            type: "init",
            payload: canvas.current
        })
    },[])

    function handleActionDown(event) {
        enforceContextState()

        switch (state.drawType) {
            case "pen":
                drawStart(event, state, userDispatch)
                break;
            case "line":
                lineStart(event, state, userDispatch)
                break;
            case "fill":
                // None, just need the case so draw type does not reset
                break;
            case "erase":
                eraseStart(event, state, userDispatch)
                break;
            case "rectangle":
                // None, just need the case so draw type does not reset
                break;
            case "ellipse":
                // None, just need the case so draw type does not reset
                break;
            default:
                userDispatch({
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
                userDispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break;
        }
    }

    function handleActionUp(event) {
        switch (state.drawType) {
            case "pen":
                drawEnd(state, userDispatch)
                break;
            case "line":
                lineEnd(event, state, userDispatch)
                break
            case "fill":
                if (event.type === 'mouseout') return

                // Fill(event)
                break
            case "erase":
                eraseEnd(state, userDispatch)
                break
            case "rectangle":
                rectStamp(event, state)
                break
            case "ellipse":
                ellipseStamp(event, state)
                break
            default:
                userDispatch({
                    type: "setDrawType",
                    payload: "pen"
                })
                break
        }

        // if end of drawing was NOT due to the mouse leaving the canvas
        if (event.type !== 'mouseout') {
            // add drawn path to last path
            userDispatch({
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
                <Tools state={state} userDispatch={userDispatch} />
                <canvas 
                    className="board" 
                    ref={canvas}
                    // width="1600" 
                    // height="900"
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