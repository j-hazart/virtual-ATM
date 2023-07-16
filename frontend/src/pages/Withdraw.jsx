import { useHandleAmout } from "../hooks/amount";
import cash from "../assets/money.svg";
import InputSection from "../components/dashboard/InputSection";
import Numpad from "../components/dashboard/Numpad";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const { amount, addNumber, deleteNumber, setActiveInput } = useHandleAmout();
  const navigate = useNavigate();

  return (
    <section className="flex h-screen w-screen flex-col bg-primary p-8 text-secondary">
      <input
        className="col-span-2 w-max rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold capitalize shadow-btn active:shadow-onPress"
        type="button"
        value="retour"
        onClick={() => navigate(-1)}
      />
      <div className="flex h-full w-full items-center justify-center max-md:flex-col">
        <InputSection
          logo={cash}
          title="Retrait"
          paragraph="Entrez le montant que vous souhaitez retirer"
          inputValue={amount}
          setActiveInput={setActiveInput}
        />
        <Numpad deleteLast={deleteNumber} addNumber={addNumber} />
      </div>
    </section>
  );
}
