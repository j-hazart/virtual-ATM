import PropTypes from "prop-types";
import { useState } from "react";
import users from "../../services/fakeUserData";

export default function CardInteraction({ cardNumbers, inputCardNumbers }) {
  const [isCardInserted, setIsCardInserted] = useState(false);
  const [message, setMessage] = useState("Veuillez insérer votre carte");

  /**
   * The function `handleCardInserted` checks if a valid card number has been entered and if it is
   * associated with a user account.
   */
  function handleCardInserted() {
    setIsCardInserted(!isCardInserted);
    setTimeout(() => {
      // vérifier le nombre de chiffre
      if (inputCardNumbers.length !== 16) {
        setIsCardInserted((old) => !old);
        setMessage(
          "Numéro invalide. Veuillez entrer les 16 chiffres de votre carte."
        );
        return;
      }

      const user = users.filter((user) =>
        user.cards.some((card) => card.number === parseInt(inputCardNumbers))
      );

      if (!user.length) {
        setIsCardInserted((old) => !old);
        setMessage("Cette carte n'est associé à aucun compte utilisateur.");
        return;
      }
    }, "1000");
  }

  return (
    <section id="card-section">
      <div id="atm-screen">
        <span id="error-message">{message}</span>
      </div>
      <section
        className="home-card-container"
        onClick={() => handleCardInserted()}
      >
        <div className="card-hole">
          <div className="holebar"></div>
        </div>
        <div className={`home-card ${isCardInserted ? "insert" : ""}`}>
          <div className="puce"></div>
          <p name="card-number" id="card-number">
            {cardNumbers}
          </p>
        </div>
      </section>
    </section>
  );
}

CardInteraction.propTypes = {
  cardNumbers: PropTypes.string.isRequired,
  inputCardNumbers: PropTypes.string.isRequired,
};
