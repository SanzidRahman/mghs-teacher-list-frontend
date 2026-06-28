"use client";

export default function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
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

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${className}`}
            />
        </div>
    );
}