const InputField = ({ label, name, value, onChange, type = "text", error }) => (
  <div className="mb-2 sm:mb-4">
    {/* <label className="block text-gray-700 text-sm sm:text-base">{label}</label> */}
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="mt-1 p-2 sm:p-3 border border-gray-300 rounded w-full text-sm sm:text-base"
      placeholder={label}
    />
    {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}
  </div>
);

export default InputField;
