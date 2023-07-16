import PropTypes from "prop-types";

export default function InputSection({ logo, title, paragraph, inputValue }) {
  return (
    <div className="flex h-max w-max flex-1 flex-col gap-16 rounded-xl p-8">
      <div className="flex items-center justify-center gap-4">
        <img className="w-16" src={logo} alt="money logo" />
        <h1 className="text-3xl font-bold uppercase">{title}</h1>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-center text-lg">{paragraph}</p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-xl font-bold">€</span>
          <input
            className=" rounded-xl bg-transparent p-2 px-4 text-center font-bold shadow-neo_inset active:border-none active:outline-none"
            type="text"
            name="withdraw"
            id="withdraw"
            value={inputValue}
          />
        </div>
        <input
          className="w-max self-center rounded-xl bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold uppercase shadow-btn active:shadow-onPress"
          type="button"
          value="Valider"
        />
      </div>
    </div>
  );
}
InputSection.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};
