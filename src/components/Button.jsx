export default function Button(props) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={(e) => props.onClick(e)}
    >
      {props.title}
    </button>
  );
}
