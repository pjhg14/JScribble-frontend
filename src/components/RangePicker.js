export default function RangePicker({ label, value, setValue }) {
    return(
        <span className="range-picker flex">
            <label htmlFor="range">{label}</label>
            <div className="flex">
                <input 
                    className="range-track"
                    type="range" 
                    id="range" 
                    min="1" 
                    max="100" 
                    value={value} 
                    onChange={setValue}
                />
                <input 
                    className="range-number"
                    type="number" 
                    id="range" 
                    min="1" 
                    max="100" 
                    value={value} 
                    onChange={setValue}
                />
            </div> 
        </span>
    )
}