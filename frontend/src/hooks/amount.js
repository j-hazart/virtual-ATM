import { useState } from "react";

export const useHandleAmout = () => {
  const [amount, setAmount] = useState("");

  function addNumber(number) {
    setAmount((old) => (old += number));
  }

  function deleteNumber() {
    setAmount((old) => old.slice(0, old.length - 1));
  }

  return {
    amount,
    addNumber,
    deleteNumber,
  };
};
