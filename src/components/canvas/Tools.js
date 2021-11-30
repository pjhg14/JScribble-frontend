import ColorPicker from "../ColorPicker"
import RangePicker from "../RangePicker"

export default function Tools({ state, canvasDispatch }) {

    // ---------------------------------------------------------------------------------------------------/
    // fill function //////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    // function handleFill(event) {
    //     const {cursorX, cursorY} = getPointerPosition(event, state.context)

    //     state.context.putImageData(fillCanvas(state.context, cursorX, cursorY), 0, 0)
    // }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    // ---------------------------------------------------------------------------------------------------/
    // Canvas functions ///////////////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handleCanvasClear() {
        state.context.clearRect(0, 0, state.canvasRect.width, state.canvasRect.height)

        canvasDispatch({
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

        canvasDispatch({
            type: "removeLastPath"
        })
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    // ---------------------------------------------------------------------------------------------------/
    // Canvas Context state change ////////////////////////////////////////////////////////////////////////
    // ---------------------------------------------------------------------------------------------------/
    function handlePenWidthChange(event) {
        canvasDispatch({
            type: "setPenSize",
            payload: event.target.value
        })
    }

    function handlePenColorChange(event) {
        canvasDispatch({
            type: "setPenColor",
            payload: event.target.value
        })
    }

    function handleFillColorChange(event) {
        canvasDispatch({
            type: "setFillColor",
            payload: event.target.value
        })
    }

    function handleCapChange(event) {
        canvasDispatch({
            type: "setPenCap",
            payload: event.target.value
        })
    }

    function handleDrawTypeChange(event) {
        canvasDispatch({
            type: "setDrawType",
            payload: event.target.value
        })
    }

    function handleStampWidthChange(event) {
        canvasDispatch({
            type: "setStampWidth",
            payload: event.target.value
        })
    }

    function handleStampHeightChange(event) {
        canvasDispatch({
            type: "setStampHeight",
            payload: event.target.value
        })
    }
    // ---------------------------------------------------------------------------------------------------/
    // ---------------------------------------------------------------------------------------------------/

    return(
        <div className="toolbar left flex column center">
            <button 
                className="button inverted toolbar-button"
                disabled={state.pastPaths.length <= 0}
                onClick={handleCanvasUndo}>
                    Undo
            </button>
            <button className="button inverted toolbar-button" onClick={handleCanvasClear}>Clear Board</button>

            <RangePicker label="Stroke Width" value={state.penSize} setValue={handlePenWidthChange}/>

            <ColorPicker label="Stroke Color" value={state.penColor} setValue={handlePenColorChange} />

            <ColorPicker label="Fill Color" value={state.fillColor} setValue={handleFillColorChange} />

            <span className="option-select flex">
                <label htmlFor="draw-type">Draw Options</label>
                <select id="draw-type" className="draw-type" value={state.drawType} onChange={handleDrawTypeChange}>
                    <optgroup label="Draw">
                        <option value="pen">Pen</option>
                        <option value="line">Lines</option>
                        {/* <option value="fill">Fill</option> */}
                        <option value="erase">Erase</option>
                    </optgroup>
                    <optgroup label="Stamp">
                        <option value="rectangle">Rectangle</option>
                        <option value="ellipse">Ellipse</option>
                    </optgroup>
                </select>
            </span>

            <span className="option-select flex">
                <label htmlFor="pen-cap">Pen Cap</label>
                <select id="pen-cap" className="pen-cap" onChange={handleCapChange}>
                    <option value="round">rounded</option>
                    <option value="square">square</option>
                </select>
            </span>

            <RangePicker label="Stamp Width" value={state.stampWidth} setValue={handleStampWidthChange} />

            <RangePicker label="Stamp Height" value={state.stampHeight} setValue={handleStampHeightChange} />
        </div>
    )
}