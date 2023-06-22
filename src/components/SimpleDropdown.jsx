import { useEffect } from "react";

const SimpleDropdown = (props) => {
  const lowercaseLabel = props.label.toLowerCase();

  const getCurrentStyle = (element) => {
    const baseStyle =
      "py-0.5 px-1 border-l-[1px] border-y-[1px] cursor-pointer";
    const lastStyle = baseStyle + " border-r-[1px]";

    if (props.options.at(-1) == element) {
      return element == props.value ? lastStyle + " bg-blue-500" : lastStyle;
    } else {
      return element == props.value ? baseStyle + " bg-blue-500" : baseStyle;
    }
  };

  useEffect(() => {
    if (!props.options.includes(props.value)) {
      props.setValue(props.options.at(0));
    }
  }, [props.options]);

  return (
    <div className="py-0.5">
      <label className="text-xs text-blue-500" htmlFor={lowercaseLabel}>
        {props.label}
      </label>

      <div id={lowercaseLabel} className="flex">
        {props.options.map((element) => (
          <div
            key={element}
            value={props.value}
            className={getCurrentStyle(element)}
            onClick={() => {
              props.setValue(element);
            }}
          >
            <p className="text-xs">
              {element + (props.suffix ? props.suffix : "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleDropdown;
