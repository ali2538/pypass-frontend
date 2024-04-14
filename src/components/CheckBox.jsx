export default function CheckBox(props) {
    return (
        <input
            defaultChecked={props.defaultChecked}
            id={props.id}
            checked={props.checked}
            type="checkbox"
            name={props.name}
            onChange={(e) => props.onChange(e)}
        />
    );
}
