import { useEffect, useState } from "react";
import CardNumberInput from "./CardNumberInput";
import axios from "axios";

import "../../styles/Home.css";
import ElectronicTerminal from "./ElectronicTerminal";
import CreditCard from "./CreditCard";

export default function CardInteraction() {
  const [inputCardNumbers, setInputCardNumbers] = useState("");
  const [cardNumbers, setCardNumbers] = useState("**** **** **** ****");
  const [isCardInserted, setIsCardInserted] = useState(false);
  const [isCardValidated, setIsCardValidated] = useState(false);
  const [message, setMessage] = useState("Veuillez insérer votre carte");

  function handleCardVerification(number) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/cards/verify`, {
        cardNumber: number,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsCardInserted((old) => !old);
          setIsCardValidated(true);
          setMessage("Entrez le code PIN");
        }
      })
      .catch(() => {
        setIsCardInserted((old) => !old);
        setMessage(
          "Cette carte n'est associé à aucun compte. Veuillez vérifier le numero de votre carte."
        );
      });
  }

  useEffect(() => {});

  /**
   * The function `handleCardInserted` checks if a valid card number has been entered and if it is
   * associated with a user account.
   */
  function handleCardInserted() {
    setIsCardInserted(!isCardInserted);
    setIsCardValidated(false);
    setTimeout(() => {
      // vérifier le nombre de chiffre
      if (inputCardNumbers.length !== 16) {
        setIsCardInserted((old) => !old);
        setMessage("Le numéro de la carte doit contenir 16 chiffres.");
        return;
      }

      handleCardVerification(inputCardNumbers);
    }, "2000");
  }

  return (
    <section className="flex flex-col items-center gap-2">
      <CardNumberInput
        inputCardNumbers={inputCardNumbers}
        setInputCardNumbers={setInputCardNumbers}
        setCardNumbers={setCardNumbers}
        handleCardInserted={handleCardInserted}
        setIsCardValidated={setIsCardValidated}
        setMessage={setMessage}
      />

      <section className="flex h-full w-full items-center justify-center gap-8 p-4">
        <ElectronicTerminal
          message={message}
          setMessage={setMessage}
          isCardValidated={isCardValidated}
          inputCardNumbers={inputCardNumbers}
        />
        <CreditCard
          isCardInserted={isCardInserted}
          cardNumbers={cardNumbers}
          handleCardInserted={handleCardInserted}
        />
      </section>
    </section>
  );
}
