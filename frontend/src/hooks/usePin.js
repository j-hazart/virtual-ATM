import { useState } from "react";

export const usePin = () => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newPinChecked, setNewPinChecked] = useState("");
  const [activeInput, setActiveInput] = useState("oldPin");

  function addNumber(number) {
    activeInput === "oldPin" &&
      oldPin.length < 4 &&
      setOldPin((old) => (old += number));

    activeInput === "newPin" &&
      newPin.length < 4 &&
      setNewPin((old) => (old += number));

    activeInput === "newPinChecked" &&
      newPinChecked.length < 4 &&
      setNewPinChecked((old) => (old += number));
  }

  function deleteNumber() {
    activeInput === "oldPin" &&
      setOldPin((old) => old.slice(0, old.length - 1));

    activeInput === "newPin" &&
      setNewPin((old) => old.slice(0, old.length - 1));

    activeInput === "newPinChecked" &&
      setNewPinChecked((old) => old.slice(0, old.length - 1));
  }

  return {
    oldPin,
    newPin,
    newPinChecked,
    addNumber,
    deleteNumber,
    setActiveInput,
  };
};
