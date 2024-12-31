const DropDownCheckBox = ({ label, options, selectedValues, onChange, showDropdown, toggleDropdown }) => {
    return (
      <div className="relative">
        <label className="block text-gray-700">{label}</label>
        <div className="relative">
          <button type="button" onClick={toggleDropdown} className="w-full text-left py-2 px-4 bg-white border rounded-md overflow-ellipsis overflow-hidden">
            {selectedValues.length === 0 ? "Select" : selectedValues.join(", ")}
          </button>
          {showDropdown && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
              {options.map((option) => (
                <label key={option.value} className="py-2 px-4 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}  // Correctly check if option is selected
                    onChange={(e) => onChange(e, option.value)}  // Update the state on checkbox change
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default DropDownCheckBox;
  