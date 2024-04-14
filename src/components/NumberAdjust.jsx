export default function NumberAdjust(props) {
  return (
    <input
      type="number"
      min={props.min}
      max={props.max}
      id={props.id}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      disabled={props.disabled}
      className={props.className}
    />
  );
}
