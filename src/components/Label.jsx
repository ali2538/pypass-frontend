export default function Label(props) {
  return (
    <label className={props.className} htmlFor={props.htmlFor}>
      {props.text}
    </label>
  );
}
