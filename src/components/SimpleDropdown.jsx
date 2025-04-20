import React, { useEffect } from 'react';

const SimpleDropdown = ({ label, options, value, setValue, suffix }) => {
  // generate a clean HTML id
  const id = label.toLowerCase().replace(/\s+/g, '-');

  // ensure value is always one of the options
  useEffect(() => {
    if (!options.includes(value)) {
      setValue(options[0]);
    }
  }, [options, value, setValue]);

  return (
    <fieldset className="mt-2">
      <legend className="text-xs text-blue-500 mb-1">{label}</legend>
      <div
        id={id}
        role="group"
        aria-labelledby={id + '-legend'}
        className="inline-flex border border-blue-500 rounded-lg overflow-hidden"
      >
        {options.map((opt, idx) => {
          const isSelected = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setValue(opt)}
              className={[
                'px-1 py-0.5 text-xs font-medium transition',
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white hover:bg-blue-400',
                idx < options.length - 1 && 'border-r border-blue-500'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt}
              {suffix && <span className="ml-0.5">{suffix}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default SimpleDropdown;
