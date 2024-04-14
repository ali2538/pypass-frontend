export default function TextBox(props) {
  return (
    <input
      type="text"
      id={props.id}
      defaultValue={props.defaultValue}
      readOnly={props.readOnly}
      className={props.className}
    />
  );
}
