const SimpleSwitch = (props) => {
  const lowercaseLabel = props.label.toLowerCase();

  return (
    <div className="flex flex-col pt-2 pr-2 items-start">
      <label className="text-xs text-blue-500" htmlFor={lowercaseLabel}>
        {props.label}
      </label>

      <input
        className="h-3.5 w-3.5"
        type="checkbox"
        id={lowercaseLabel}
        checked={props.switchOn}
        onChange={props.toggleSwitch}
      />
    </div>
  );
};

export default SimpleSwitch;
