import "./Input.css"

export default function Input ({label, placeholder, value, onChange}) {
    return (
        <div className="form-section">
            <label>{label}:</label>
            <input className="form-input" type="text" placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    )
}