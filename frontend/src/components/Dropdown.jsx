const Dropdown = ({ options = [], value, onChange }) => {
  return (
    <div className="dropdown">
      <select
        className="dropdown-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        <option value="">Product category</option>
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;
