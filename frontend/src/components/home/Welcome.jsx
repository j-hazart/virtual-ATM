import PropTypes from "prop-types";
import { useState } from "react";
import openEye from "../../assets/eye.svg";
import closeEye from "../../assets/eye-slash.svg";
import {
  separateCardNumber,
  hideCardNumber,
} from "../../services/formatCardNumbers";

export default function Welcome({
  inputCardNumbers,
  setInputCardNumbers,
  setCardNumbers,
}) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  /**
   * The function "formatCardNumber" takes a card number value as input and formats it by separating it
   * into groups of four digits and hiding all but the last two digits.
   */
  function formatCardNumber(value) {
    let cardIdValue = "";
    value.length === 0 && setCardNumbers("#### #### #### ####");
    value.split("").forEach((number, i) => {
      cardIdValue += separateCardNumber(i, 4) + hideCardNumber(i, number, 14);
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
      setInputCardNumbers(value);
      formatCardNumber(value);
    }
  }

  return (
    <section className="welcome">
      <h1>Bienvenue</h1>
      <p>
        Pour commencer à utiliser le distributeur, entrez le numero de votre
        carte et insérez la.
      </p>
      <div>
        <div className="card-number-input">
          <input
            type="text"
            name="cardId"
            id="cardID"
            onChange={(e) => handleChange(e)}
            placeholder="Numéro de la carte"
            value={inputCardNumbers}
            autoComplete="off"
            style={{ WebkitTextSecurity: `${isEyeOpen ? "none" : "disc"}` }}
          />
          <img
            src={isEyeOpen ? openEye : closeEye}
            alt="icon of an eye open or close"
            onClick={() => setIsEyeOpen(!isEyeOpen)}
          />
        </div>
      </div>
    </section>
  );
}

Welcome.propTypes = {
  inputCardNumbers: PropTypes.string.isRequired,
  setInputCardNumbers: PropTypes.func.isRequired,
  setCardNumbers: PropTypes.func.isRequired,
};
