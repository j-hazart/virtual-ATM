import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import users from "../../services/fakeUserData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* import contactless from "../../assets/contactless.svg"; */

export default function ElectronicTerminal({
  message,
  isCardValidated,
  inputCardNumbers,
}) {
  const tpe = [7, 8, 9, 4, 5, 6, 1, 2, 3, "annuler", 0, "valider"];
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPin("");
  }, [inputCardNumbers]);

  function handlePin(value) {
    if (!isCardValidated) return;
    if (pin.length < 4) {
      typeof value === "number" && setPin((old) => (old += value));
    }
    value === "annuler" && setPin("");

    if (value === "valider") {
      /* axios.post(`${import.meta.env.VITE_BACKEND_URL}/checkCard`, {
        cardNumber: inputCardNumbers,
      }); */
      let user = users.find((user) =>
        user.cards.some((card) => card.number === parseInt(inputCardNumbers))
      );
      user.cards.some(
        (card) =>
          card.number === parseInt(inputCardNumbers) &&
          card.pin === parseInt(pin)
      ) && navigate("/dashboard");
    }
  }

  return (
    <div className="z-10 flex h-max w-max translate-x-[0vw] flex-col gap-4 rounded-3xl border-2 border-b-primary border-l-white border-r-primary border-t-white bg-primary p-8 shadow-box transition-all ">
      {/* screen */}
      <div className="h-32 min-w-full max-w-min rounded-lg p-2 shadow-neo_inset">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-screen p-2 shadow-neo_screen">
          <p className="text-center">{message}</p>
          <p className="text-center" style={{ WebkitTextSecurity: "disc" }}>
            {pin}
          </p>
        </div>
      </div>

      {/* pad */}
      <div className="grid grid-cols-3 grid-rows-4 gap-4 p-4">
        {tpe.map((value) => (
          <div
            key={value}
            onClick={() => handlePin(value)}
            className={`${
              typeof value === "string"
                ? value === "annuler"
                  ? "bg-red-700 text-primary shadow-neo_bound_red active:shadow-neo_bound_red_inset"
                  : "bg-green-700 text-primary shadow-neo_bound_green active:shadow-neo_bound_green_inset"
                : " shadow-neo_bound active:shadow-neo_inset"
            } rounded-full p-2 text-center font-bold`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

ElectronicTerminal.propTypes = {
  message: PropTypes.string.isRequired,
  inputCardNumbers: PropTypes.string.isRequired,
  isCardValidated: PropTypes.bool.isRequired,
};
