"use client";

export default function SelectInput({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select",
    className = "",
}) {
    return (
        <div className="grid grid-cols-2 items-center gap-4">
            <label
                htmlFor={name}
                className="font-medium text-gray-700"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option
                        key={option.value || option}
                        value={option.value || option}
                    >
                        {option.label || option}
                    </option>
                ))}
            </select>
        </div>
    );
}