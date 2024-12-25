const InputField = ({ id, label, type, value, onChange, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
        placeholder={placeholder}
        required
      />
    </div>
  );
  
  export default InputField;
  