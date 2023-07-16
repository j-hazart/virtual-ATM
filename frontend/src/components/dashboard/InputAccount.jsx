import PropTypes from "prop-types";
import user from "../../assets/user.svg";

export default function InputAccount({ setActiveInput, accountNumbers }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-lg">
        Entrez le numéro de compte vers lequel vous voulez faire un virement
      </p>
      <div className="flex items-center justify-center gap-4">
        <img className="text-xl font-bold" src={user} />
        <input
          className=" rounded-xl bg-transparent p-2 px-4 text-center font-bold shadow-neo_inset active:border-none active:outline-none"
          type="text"
          name="account"
          id="account"
          value={accountNumbers}
          onFocus={(e) => setActiveInput(e.target.id)}
          readOnly
        />
      </div>
    </div>
  );
}
InputAccount.propTypes = {
  setActiveInput: PropTypes.func.isRequired,
  accountNumbers: PropTypes.string.isRequired,
};
