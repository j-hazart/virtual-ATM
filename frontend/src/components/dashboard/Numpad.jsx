import PropTypes from "prop-types";

export default function Numpad({ deleteLast, addNumber }) {
  const pad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="grid h-max w-max flex-1 grid-cols-3 grid-rows-4 place-items-center gap-8 p-8 text-xl font-bold">
      {pad.map((number) => (
        <input
          className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] text-center shadow-btn active:shadow-onPress"
          key={number}
          type="button"
          value={number}
          onClick={() => addNumber(number)}
        />
      ))}
      <input
        className="col-span-2 h-full w-full rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] uppercase shadow-btn active:shadow-onPress"
        type="button"
        value="effacer"
        onClick={() => deleteLast()}
      />
    </div>
  );
}

Numpad.propTypes = {
  deleteLast: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
};
