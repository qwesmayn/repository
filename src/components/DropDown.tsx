import { FC } from "react";

interface DropdownProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder: string;
}

const Dropdown: FC<DropdownProps> = ({ value, onChange, options, placeholder }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="p-2 border rounded-3xl shadow-lg"
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
