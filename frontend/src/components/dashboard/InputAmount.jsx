import PropTypes from "prop-types";

export default function InputAmount({ value, content, setActiveInput }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-lg">{content}</p>
      <div className="flex items-center justify-center gap-4">
        <span className="text-xl font-bold">€</span>
        <input
          className=" rounded-xl bg-transparent p-2 px-4 text-center font-bold shadow-neo_inset active:border-none active:outline-none"
          type="text"
          name="amount"
          id="amount"
          value={value}
          onFocus={(e) => setActiveInput(e.target.id)}
          readOnly
        />
      </div>
    </div>
  );
}
InputAmount.propTypes = {
  value: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setActiveInput: PropTypes.func.isRequired,
};
