import { useState } from "react";

export const useHandleAmout = () => {
  const [activeInput, setActiveInput] = useState(null);

  function addNumber(number) {
    setAmount((old) => (old += number));
  }

  return {
    activeInput,
    addNumber,
    deleteNumber,
  };
};
