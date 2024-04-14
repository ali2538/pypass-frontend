export default function Slider(props) {
    return (
        <input
            step={props.step}
            type="range"
            min={props.min}
            max={props.max}
            id={props.id}
            value={props.value}
            onChange={e => props.onChange(e)}
        />
    )
}