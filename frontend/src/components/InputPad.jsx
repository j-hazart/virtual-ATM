import PropTypes from "prop-types";

export default function InputPad({ id, content, img, value, onFocus }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-lg">{content}</p>
      <div className="flex items-center justify-center gap-4">
        <img className="text-xl font-bold" src={img} />
        <input
          className=" rounded-xl bg-transparent p-2 px-4 text-center font-bold shadow-neo_inset active:border-none active:outline-none"
          type="text"
          name={id}
          id={id}
          value={value}
          onFocus={(e) => onFocus(e.target.id)}
          style={{ WebkitTextSecurity: "disc" }}
          readOnly
        />
      </div>
    </div>
  );
}

InputPad.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
};
