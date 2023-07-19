import PropTypes from "prop-types";
import InputPad from "../InputPad";
import pass from "../../assets/password.svg";
import card from "../../assets/credit-card.svg";

export default function ChangePinSection({
  oldPin,
  newPin,
  newPinChecked,
  onFocus,
}) {
  return (
    <div className="flex h-max w-max flex-1 flex-col gap-16 rounded-xl p-8">
      <div className="flex items-center justify-center gap-4">
        <img className="w-16" src={card} alt="money logo" />
        <h1 className="text-3xl font-bold uppercase">Changer le PIN</h1>
      </div>

      <div className="flex flex-col gap-8">
        <InputPad
          id="oldPin"
          content="Ancien PIN"
          img={pass}
          value={oldPin}
          onFocus={onFocus}
        />
        <InputPad
          id="newPin"
          content="Nouveau PIN"
          img={pass}
          value={newPin}
          onFocus={onFocus}
        />
        <InputPad
          id="newPinChecked"
          content="Confirmer nouveau PIN"
          img={pass}
          value={newPinChecked}
          onFocus={onFocus}
        />
        <input
          className="w-max self-center rounded-xl bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold uppercase shadow-btn active:shadow-onPress"
          type="button"
          value="Valider"
        />
      </div>
    </div>
  );
}
ChangePinSection.propTypes = {
  oldPin: PropTypes.string.isRequired,
  newPin: PropTypes.string.isRequired,
  newPinChecked: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
};
