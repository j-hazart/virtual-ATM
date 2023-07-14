import PropTypes from "prop-types";
import { useState } from "react";
import openEye from "../../assets/eye.svg";
import closeEye from "../../assets/eye-slash.svg";
import {
  separateCardNumber,
  hideCardNumber,
} from "../../services/formatCardNumbers";

export default function CardNumberInput({
  inputCardNumbers,
  setInputCardNumbers,
  setCardNumbers,
  handleCardInserted,
  setIsCardValidated,
  setMessage,
}) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  /**
   * The function "formatCardNumber" takes a card number value as input and formats it by separating it
   * into groups of four digits and hiding all but the last two digits.
   */
  function formatCardNumber(value) {
    let cardIdValue = "";
    value.length === 0 && setCardNumbers("**** **** **** ****");
    value.split("").forEach((number, i) => {
      cardIdValue += separateCardNumber(i, 4) + hideCardNumber(i, number, 12);
      setCardNumbers(cardIdValue);
    });
  }

  /**
   * The handleChange function updates the input number and formats the card number if the input value
   * is a string of up to 16 digits.
   */
  function handleChange(e) {
    const value = e.target.value;
    if (/^\d{0,16}$/.test(value)) {
      setMessage("Veuillez insérer votre carte");
      setIsCardValidated(false);
      setInputCardNumbers(value);
      formatCardNumber(value);
    }
  }

  return (
    <div>
      <div className="flex gap-2 rounded-full p-2">
        <img
          className="rounded-full p-2 shadow-[0_0_3px_#d7dde6] active:border-none active:shadow-neo_inset"
          src={isEyeOpen ? openEye : closeEye}
          alt="icon of an eye open or close"
          onClick={() => setIsEyeOpen(!isEyeOpen)}
        />
        <input
          className="w-[18ch] rounded-full bg-transparent p-2 text-center shadow-neo_inset outline-none"
          type="text"
          name="cardId"
          id="cardID"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => e.key === "Enter" && handleCardInserted()}
          placeholder="Numéro de carte"
          value={inputCardNumbers}
          autoComplete="off"
          style={{ WebkitTextSecurity: `${isEyeOpen ? "none" : "disc"}` }}
        />
      </div>
    </div>
  );
}
CardNumberInput.propTypes = {
  inputCardNumbers: PropTypes.string.isRequired,
  setInputCardNumbers: PropTypes.func.isRequired,
  setCardNumbers: PropTypes.func.isRequired,
  handleCardInserted: PropTypes.func.isRequired,
  setIsCardValidated: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
