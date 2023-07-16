import { useState } from "react";

export const useHandleAmout = () => {
  const [amount, setAmount] = useState("");
  const [accountNumbers, setAccountNumbers] = useState("");
  const [activeInput, setActiveInput] = useState("amount");

  function addNumber(number) {
    activeInput === "amount" && setAmount((old) => (old += number));
    if (
      activeInput === "account" &&
      /^\d{0,16}$/.test(number) &&
      accountNumbers.length < 16
    ) {
      setAccountNumbers((old) => (old += number));
    }
  }

  function deleteNumber() {
    activeInput === "amount" &&
      setAmount((old) => old.slice(0, old.length - 1));
    activeInput === "account" &&
      setAccountNumbers((old) => old.slice(0, old.length - 1));
  }

  return {
    amount,
    accountNumbers,
    addNumber,
    deleteNumber,
    setActiveInput,
  };
};
