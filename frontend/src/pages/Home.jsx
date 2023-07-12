import { useState } from "react";

import users from "../services/fakeUserData";
import "../styles/Home.css";
import Welcome from "../components/home/Welcome";

export default function Home() {
  const [isCardInserted, setIsCardInserted] = useState(false);
  const [inputCardNumbers, setInputCardNumbers] = useState("");
  const [cardNumbers, setCardNumbers] = useState("#### #### #### ####");
  const [message, setMessage] = useState("Veuillez insérer votre carte");

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
    <section id="home">
      <Welcome
        inputCardNumbers={inputCardNumbers}
        setInputCardNumbers={setInputCardNumbers}
        setCardNumbers={setCardNumbers}
      />
      {/* <section className="welcome">
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
      </section> */}
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
    </section>
  );
}
