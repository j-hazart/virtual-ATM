import { useState } from "react";
import users from "../../services/fakeUserData";
import CardNumberInput from "./CardNumberInput";

import "../../styles/Home.css";
import ElectronicTerminal from "./ElectronicTerminal";
import CreditCard from "./CreditCard";

export default function CardInteraction() {
  const [inputCardNumbers, setInputCardNumbers] = useState("");
  const [cardNumbers, setCardNumbers] = useState("**** **** **** ****");
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
        setMessage("Le numéro de la carte doit contenir 16 chiffres.");
        return;
      }

      const user = users.filter((user) =>
        user.cards.some((card) => card.number === parseInt(inputCardNumbers))
      );

      if (!user.length) {
        setIsCardInserted((old) => !old);
        setMessage(
          "Cette carte n'est associé à aucun compte. Veuillez vérifier le numero de votre carte."
        );
        return;
      }
      setIsCardInserted((old) => !old);
      setMessage("Entrez le code PIN");
    }, "2000");
  }

  return (
    <section className="flex flex-col items-center gap-2">
      <CardNumberInput
        inputCardNumbers={inputCardNumbers}
        setInputCardNumbers={setInputCardNumbers}
        setCardNumbers={setCardNumbers}
        handleCardInserted={handleCardInserted}
      />

      <section className="flex h-full w-full items-center justify-center gap-8 p-4">
        <ElectronicTerminal message={message} />
        <CreditCard
          isCardInserted={isCardInserted}
          cardNumbers={cardNumbers}
          handleCardInserted={handleCardInserted}
        />
      </section>
    </section>
  );
}
