export default function RangePicker({ label, value, setValue }) {
    return(
        <>
            <label htmlFor="stroke-width">{label}</label>
                <input 
                    type="range" 
                    id="stroke-width" 
                    min="1" 
                    max="100" 
                    value={value} 
                    onChange={setValue}
                />
                <input 
                    type="number" 
                    id="stroke-width" 
                    min="1" 
                    max="100" 
                    value={value} 
                    onChange={setValue}
                />
        </>
    )
}