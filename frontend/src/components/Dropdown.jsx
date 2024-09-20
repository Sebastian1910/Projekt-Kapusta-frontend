import React from "react";
import "../styles/components/Dropdown.scss";

const Dropdown = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
      <option value="">Wybierz kategorię</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
