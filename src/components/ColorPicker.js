export default function ColorPicker({ label, value, setValue }) {
    return(
        <span className="color-picker flex">
            <label className="color-label" htmlFor="color-picker">{label}</label>
            <input
                className="color"
                type="color"   
                id="color-picker"
                value={value}
                onChange={setValue}
            />
        </span>
    )
}