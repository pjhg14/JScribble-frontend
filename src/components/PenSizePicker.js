export default function PenSizePicker({ penSize, setPenSize }) {
    return(
        <>
            <label htmlFor="stroke-width">Stroke Width</label>
                <input 
                    type="range" 
                    id="stroke-width" 
                    min="1" 
                    max="100" 
                    value={penSize} 
                    onChange={setPenSize}
                />
                <input 
                    type="number" 
                    id="stroke-width" 
                    min="1" 
                    max="100" 
                    value={penSize} 
                    onChange={setPenSize}
                />
        </>
    )
}